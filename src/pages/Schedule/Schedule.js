import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  ScrollView,
  AppState
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GoBack from '../../elements/GoBack';
import { fetchSchedule } from "./../../_actions/schedule";
import { fetchWorkshopDetail } from "./../../_actions/workshops";
import { COLOR_YELLOW } from '../../styles/common';
import { connect } from 'react-redux';
import { updateAlert } from "./../../_actions/errors";
import DateSlider from "./../../elements/DateSlider";

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertPresent: false
    }

    this.getDuration = this.getDuration.bind(this);
    this.setWorkshopStyles = this.setWorkshopStyles.bind(this);
  }

  componentDidMount(){
    AppState.addEventListener('change',this.handleAppStateChange);
  }

  componentWillUnmount(){
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.errorMessage && this.props.errorMessage) {
      Alert.alert(
        'Error!',
        this.props.errorMessage,
        {text: 'OK', onPress: this.props.updateAlert('')},
        {cancelable: false},
      );
    }
  }

  getDuration(start, end) {
    const hour = parseInt(end.split(":")[0]) - parseInt(start.split(":")[0]);
    const min = (parseInt(end.split(":")[1])- parseInt(start.split(":")[1]))/60;
    duration = hour + min;
    return [hour, duration, min];
  }

  setWorkshopStyles(schedule) {
    const workshops = Object.assign([], schedule);

    for (let index in workshops) {
      const fromLast = this.getDuration(workshops[index-1]? workshops[index-1].end_time : "08:00", workshops[index].start_time);
      const marginTop = 60 * fromLast[1];

      const itself = this.getDuration(workshops[index].start_time, workshops[index].end_time);
      const height = 60 * itself[1];

      workshops[index].style = {
        height,
        marginTop
      }
    }

    return workshops;
  }

  render() {
    if (this.props.authToken) {
      return (
        <LinearGradient colors={['#0F2037', '#1D3351']} style={styles.container}>
          <GoBack onPress={() => this.props.navigation.navigate('dashboard')} />
          <Text style={styles.header}>Schedule</Text>
          <DateSlider authToken={this.props.authToken} request={this.props.fetchSchedule}/>
          {this.props.isLoading? (
                <View style={styles.dimmingContainer}>
                  <ActivityIndicator size="large" color={COLOR_YELLOW} />
                </View>
              ) : (
                <ScrollView contentContainersStyle={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
                  <View style={styles.calendar}>
                    <View style={[styles.timeSlotContainer, {zIndex: 99}]}>
                      <FlatList
                        data={[
                          {time: '08:00'},
                          {time: '09:00'},
                          {time: '10:00'},
                          {time: '11:00'},
                          {time: '12:00'},
                          {time: '13:00'},
                          {time: '14:00'},
                          {time: '15:00'},
                          {time: '16:00'},
                          {time: '17:00'}
                        ]}
                        keyExtractor={item => item.time}
                        renderItem={({item, index}) => (
                          <View style={styles.scheduleListRow}>
                            <Text style={styles.time}>{item.time}</Text>
                            <View style={index!=9?styles.blankContainer: [styles.blankContainer, {borderBottomWidth: 0}]} />
                          </View>
                        )}
                        scrollEnabled={false}
                      />
                    </View>
                    <View style={[styles.timeSlotContainer, {zIndex: 100}]}>
                      <FlatList
                        data={this.setWorkshopStyles(this.props.schedule)}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.scheduleListRow}>
                              <TouchableHighlight
                                style={[styles.workshopContainer, item.style]}
                                underlayColor='#E5C58D'
                                onPress={() => this.props.fetchWorkshopDetail(this.props.authToken, item.id, this.props.navigation)}
                                >
                                <View style={styles.contentWrapper}>
                                  <Text textAlign='left' style={styles.workshopName}>{item.title}</Text>
                                  <Text textAlign='center' style={styles.workshopLocation}>{item.location}</Text>
                                </View>
                              </TouchableHighlight>
                            </View>
                          )}
                        scrollEnabled={false}
                      />
                    </View>
                  </View>
                </ScrollView>
              )
            }
        </LinearGradient>
      )
    } else {
      if (!this.state.alertPresent) {
        Alert.alert(
          'Error!',
          'Your session expired. Please log in again.',
          {text: 'OK', onPress: this.props.navigation.navigate('login')},
          {cancelable: false},
        );

        this.setState({
          alertPresent: true
        })
      }
      return null
    }
  }
};

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
    schedule: state.schedule,
    hasErrored: state.scheduleFailed,
    isLoading: state.scheduleLoading,
    errorMessage: state.alertMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkshopDetail: (authToken, id, navigation) => dispatch(fetchWorkshopDetail(authToken, id, navigation)),
    fetchSchedule: (authToken, date) => dispatch(fetchSchedule(authToken, date)),
    updateAlert: (message) => dispatch(updateAlert(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  dimmingContainer: {
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.3)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: "Helvetica",
    color: "#ffffff",
    marginTop: 87
  },
  scheduleListRow: {
    flex: 1,
    flexDirection: "row",
  },
  time: {
    width: 35,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLOR_YELLOW
  },
  scheduleContainer: {
    flex: 1,
  },
  calendar: {
    height: 650,
  },
  timeSlotContainer: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  blankContainer: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    borderColor: "#64748A",
    backgroundColor: "#243C5A",
    borderBottomWidth: 1,
  },
  workshopContainer: {
    flex: 1,
    marginLeft: 35,
    width: "100%",
    height: 49,
    borderRadius: 10,
    borderColor: "#64748A",
    borderWidth: 1,
    backgroundColor: COLOR_YELLOW
  },
  contentWrapper: {flex: 1,
    flexDirection: "row",
  },
  workshopName: {
    flex: 6,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  workshopLocation: {
    flex: 3,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "white",
    alignSelf: "flex-end",
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 10,
  }
});