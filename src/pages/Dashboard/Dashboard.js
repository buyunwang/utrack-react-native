import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import { connect } from "react-redux";
import PushController from "../../_service/pushController";
import instructor_icon from './images/instructors.png';
import course_icon from './images/course.png';
import schedule_icon from './images/schedule.png';
import news_icon from './images/news.png';
import event_icon from './images/events.png';
import workshop_icon from './images/workshop.png';

class Dashboard extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    if (!this.props.authToken) {
      this.props.navigation.navigate('login');
      return null
    } else {
      return (
        <LinearGradient style={styles.container} colors = {['#0F2037', '#1D3351']}>
          <PushController />
          <View style={[styles.row, styles.firstRow]}>
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('comingSoon')}>
              <Image style={styles.icon} source={course_icon} resizeMode='contain'/>
              <Text style={styles.title}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('schedule')}>
              <Image style={styles.icon} source={schedule_icon} resizeMode='contain'/>
              <Text style={styles.title}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('comingSoon')}>
              <Image style={styles.icon} source={instructor_icon} resizeMode='contain'/>
              <Text style={styles.title}>Instructors</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('comingSoon')}>
              <Image style={styles.icon} source={news_icon} resizeMode='contain'/>
              <Text style={styles.title}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('comingSoon')}>
              <Image style={styles.icon} source={event_icon} resizeMode='contain'/>
              <Text style={styles.title}>Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('workshopList')}>
              <Image style={styles.icon} source={workshop_icon} resizeMode='contain'/>
              <Text style={styles.title}>Workshops</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken
  };
};

export default connect(mapStateToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstRow: {
    marginBottom: 30,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    height: 81,
    width: 81,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  }
});
