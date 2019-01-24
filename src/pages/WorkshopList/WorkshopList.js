import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GoBack from '../../elements/GoBack';
import { COLOR_YELLOW } from '../../styles/common';
import unfaved from "../../elements/images/blank.png";
import faved from "../../elements/images/purple.png";
import { connect } from "react-redux";
import { fetchWorkshops, fetchWorkshopDetail, registerWorkshops, cancelWorkshops } from "./../../_actions/workshops";
import { updateAlert } from "./../../_actions/errors";
import DateSlider from "../../elements/DateSlider";
import PushNotification from "react-native-push-notification";

class Workshops extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      alertPresent: false
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.errorMessage && this.props.errorMessage) {
      Alert.alert(
        'Error!',
        this.props.errorMessage,
        { text: 'OK', onPress: this.props.updateAlert('') },
        { cancelable: false },
      );
    }
  }

  rsvpWorkshop(workshopId, isAttending) {
    if (isAttending) {
      this.props.cancelWorkshops(this.props.authToken, workshopId, PushNotification);
    } else {
      this.props.registerWorkshops(this.props.authToken, workshopId, PushNotification);
    }
  }

  render() {
    if (this.props.authToken) {
      return (
        <LinearGradient colors={['#0F2037', '#1D3351']} style={styles.container}>
          <GoBack onPress={() => this.props.navigation.navigate('dashboard')} />
          {this.props.rsvpLoading ? (
            <View style={styles.dimmingContainer}>
              <ActivityIndicator size="large" color={COLOR_YELLOW} />
            </View>
          ) : null}
          <Text style={styles.header}>Workshops</Text>
          <DateSlider authToken={this.props.authToken} request={this.props.fetchWorkshops} />
          {this.props.fetchIsLoading ? (
            <View style={styles.dimmingContainer}>
              <ActivityIndicator size="large" color={COLOR_YELLOW} />
            </View>
          ) : (this.props.workshops && this.props.workshops.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.workshopView}
              data={this.props.workshops}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.workshopContainer} onPress={() => this.props.fetchWorkshopDetail(this.props.authToken, item.id, this.props.navigation)}>
                  <View style={styles.nameLocation}>
                    {(item.title.length > 85)?(<Text style={styles.workshopName}>{item.title.substring(0,83)}...</Text>)
                    :(<Text style={styles.workshopName}>{item.title}</Text>)}
                    <Text style={styles.workshopLocation}>{item.location}</Text>
                  </View>
                  <View style={styles.timeSection}>
                    <Text style={item.capacity > item.num_participants ? styles.available : styles.full}>{item.capacity > item.num_participants ? "Available" : "Class Full"}</Text>
                    <Text style={styles.time}>{item.start_time}{'\n'}{item.end_time}</Text>
                  </View>
                  <TouchableOpacity style={styles.rsvp} onPress={() => this.rsvpWorkshop(item.id, item.is_attending)}>
                    <Image style={item.is_attending ? styles.favedIcon : styles.unfavedIcon} source={item.is_attending ? faved : unfaved} resizeMode='contain' />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          ) : (
              <View style={styles.workshopView}>
                <Text style={styles.notFoundText}>No workshops found for this date.</Text>
              </View>
            )
            )}
        </LinearGradient>
      )
    } else {
      if (!this.state.alertPresent) {
        Alert.alert(
          'Error!',
          'Your session expired. Please log in again.',
          { text: 'OK', onPress: this.props.navigation.navigate('login') },
          { cancelable: false },
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
    workshops: state.workshops,
    authToken: state.authToken,
    fetchHasErrored: state.fetchWorkshopsFailed,
    fetchIsLoading: state.fetchWorkshopsLoading,
    errorMessage: state.alertMessage,
    registerHasErrored: state.registerWorkshopsFailed,
    rsvpLoading: state.rsvpLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWorkshopDetail: (authToken, id, navigation) => dispatch(fetchWorkshopDetail(authToken, id, navigation)),
    fetchWorkshops: (authToken, date) => dispatch(fetchWorkshops(authToken, date)),
    registerWorkshops: (authToken, id, ps) => dispatch(registerWorkshops(authToken, id, ps)),
    cancelWorkshops: (authToken, id, ps) => dispatch(cancelWorkshops(authToken, id, ps)),
    updateAlert: (message) => dispatch(updateAlert(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workshops);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative'
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
  notFoundText: {
    color: "white",
    fontSize: 20
  },
  header: {
    fontSize: 30,
    fontFamily: "Helvetica",
    color: "#ffffff",
    paddingTop: 87
  },
  workshopView: {
  },
  workshopContainer: {
    flex: 1,
    flexDirection: "row",
    height: 74,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#64748A",
    backgroundColor: "#243C5A",
    marginBottom: 6
  },
  nameLocation: {
    flex: 8,
    marginLeft: 15
  },
  timeSection: {
    flex: 2,
    alignSelf: 'center',
  },
  rsvp: {
    flex: 2,
    marginLeft: 10,
  },
  workshopName: {
    fontFamily: "Helvetica",
    fontSize: 13.5,
    color: "#ffffff",
    fontWeight: "bold",
  },
  workshopLocation: {
    fontFamily: "Helvetica",
    fontSize: 13,
    color: COLOR_YELLOW
  },
  time: {
    fontFamily: "Helvetica",
    fontSize: 13,
    color: COLOR_YELLOW,
    textAlign: "center"
  },
  available: {
    fontSize: 8,
    fontFamily: "Helvetica",
    textAlign: "center",
    color: "#C17EFF"
  },
  full: {
    fontSize: 8,
    fontFamily: "Helvetica",
    textAlign: "center",
    color: COLOR_YELLOW
  },
  unfavedIcon: {
    height: 30,
    width: 30
  },
  favedIcon: {
    height: 25,
    width: 25,
    marginLeft: 3,
    marginBottom: 5,
  },
  text: {
    fontSize: 19,
    fontFamily: "Helvetica",
    textAlign: "center",
    lineHeight: 30,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 70,
    color: "#ffffff",
    backgroundColor: "transparent"
  }
});