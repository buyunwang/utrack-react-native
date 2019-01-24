import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PushNotification from 'react-native-push-notification';
import GoBack from '../../elements/GoBack';
import { COLOR_YELLOW } from '../../styles/common';
import faved from "../../elements/images/purple.png";
import unfaved from "../../elements/images/blank.png";
import { registerWorkshops, cancelWorkshops } from "./../../_actions/workshops";
import { updateAlert } from "./../../_actions/errors";
import PushController from "./../../_service/pushController";

const monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class Workshop extends Component {
    constructor(props) {
      super(props);

      this.state = {
        alertPresent: false
      }

      this.rsvpWorkshop = this.rsvpWorkshop.bind(this);
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
          <LinearGradient colors={["#0F2037", "#1D3351"]} style={styles.container}>
            <GoBack onPress={() => this.props.navigation.goBack()} />
            <PushController />
            {this.props.rsvpLoading ? (
              <View style={styles.dimmingContainer}>
                <ActivityIndicator size="large" color={COLOR_YELLOW} />
              </View>
            ) : null}
            <Text style={styles.header}>Workshop</Text>
              <ScrollView contentContainerStyle={styles.workshopContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.workshopCard}>
                  <View style={styles.workshopNameContainer}>
                    <Text style={styles.workshopName}>{this.props.workshop.title}</Text>
                    <TouchableOpacity style={styles.rsvp} onPress={() => this.rsvpWorkshop(this.props.workshop.id, this.props.workshop.is_attending)}>
                      <Image style={this.props.workshop.is_attending ? styles.favedIcon : styles.unfavedIcon} source={this.props.workshop.is_attending ? faved : unfaved} resizeMode='contain' />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.host}>{this.props.workshop.instructor}</Text>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.detail}>Location</Text>
                    <Text style={styles.detailContent}>{this.props.workshop.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detail}>Date</Text>
                    <Text style={styles.detailContent}>
                      {this.props.workshop.date.split('-').join(' / ')}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detail}>Time</Text>
                    <Text style={styles.detailContent}>
                      {this.props.workshop.start_time} - {this.props.workshop.end_time}
                    </Text>
                  </View>
                  <View style={[styles.detailRow, {marginBottom: 0}]}>
                    <Text style={styles.detail}>Status</Text>
                    <Text style={styles.detailContent}>
                      {this.props.workshop.num_participants < this.props.workshop.capacity?
                        "Available" : "Full"
                      }
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <Text style={styles.summaryTitle}>Summary</Text>
                  <Text style={styles.summaryContent}>
                    {this.props.workshop.summary}
                  </Text>
                </View>
              </ScrollView>
          </LinearGradient>
        );
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

const mapStateToProps = (state, props) => {
  return {
    workshop: state.workshop,
    authToken: state.authToken,
    errorMessage: state.alertMessage,
    registerHasErrored: state.registerWorkshopsFailed,
    cancelHasErrored: state.cancelWorkshopsFailed,
    rsvpLoading: state.rsvpLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerWorkshops: (authToken, id, ps) => dispatch(registerWorkshops(authToken, id, ps)),
    cancelWorkshops: (authToken, id, ps) => dispatch(cancelWorkshops(authToken, id, ps)),
    updateAlert: (message) => dispatch(updateAlert(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workshop);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    fontSize: 30,
    fontFamily: "Helvetica",
    color: "#ffffff",
    marginTop: 87,
    marginBottom: 30
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
  workshopContainer: {
    borderColor: "#64748A",
  },
  workshopCard: {
    backgroundColor: "#233C5C",
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 40,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detail: {
    color: COLOR_YELLOW,
    fontSize: 16
  },
  detailContent: {
    color: "white",
    fontSize: 16,
    marginLeft: 10
  },
  workshopNameContainer: {
    flex: 1,
    flexDirection: "row",
  },
  workshopName: {
    flex: 9,
    paddingRight: 15,
    fontFamily: "Helvetica",
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold"
  },
  rsvp: {
    flex: 1,

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
  host: {
    marginTop: 5,
    fontFamily: "Helvetica",
    fontSize: 16,
    color: COLOR_YELLOW,
    fontWeight: "bold"
  },
  divider: {
    marginTop: 22,
    borderBottomColor: COLOR_YELLOW,
    borderBottomWidth: 1,
    marginBottom: 22
  },
  summaryTitle: {
    fontSize: 16,
    color: COLOR_YELLOW,
    marginBottom: 6
  },
  summaryContent: {
    fontSize: 16,
    color: "white",
    textAlign: "left",
  }
});