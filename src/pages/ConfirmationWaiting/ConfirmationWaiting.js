import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from "./../../elements/CustomButton";
import GoBack from "./../../elements/GoBack";
import icon from './images/waiting-icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 150
  },
  title: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 5,
  },
  subtitle: {
    color: '#758191',
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
    lineHeight: 22,
    width: 270,
  }
});

class ConfirmationWaiting extends Component {
  render() {
    return(
      <LinearGradient style={styles.container} colors = {['#0F2037', '#1D3351']}>
        <GoBack onPress={()=>this.props.navigation.goBack()}/>
        <Image style={styles.icon} source={icon} resizeMode='contain'/>
        <Text style={styles.title}>Almost Done</Text>
        <Text style={styles.subtitle}>
          Your request has been received and an email has been sent to you. Please check your email account and come back once you complete the process.
        </Text>
        <CustomButton title="Log In" onPress={()=>this.props.navigation.navigate('login')}/>
      </LinearGradient>
    )
  }
};

export default ConfirmationWaiting;
