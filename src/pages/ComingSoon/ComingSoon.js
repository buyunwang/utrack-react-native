import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import CustomButton from './../../elements/CustomButton';
import GoBack from './../../elements/GoBack';
import icon from './images/coming-soon-icon.png';
import LinearGradient from 'react-native-linear-gradient';

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
    marginTop: 80,
    marginBottom: 5,
  },
  subtitle: {
    color: '#758191',
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginBottom: 50,
  }
});

class ComingSoon extends Component {
  render() {
    return(
      <LinearGradient style={styles.container} colors = {['#0F2037', '#1D3351']}>
        <GoBack onPress={()=>this.props.navigation.goBack()}/>
        <Image style={styles.icon} source={icon} resizeMode='contain'/>
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>Thank you for your patience</Text>
        <CustomButton title='Awesome!' onPress={()=>this.props.navigation.navigate('dashboard')}/>
      </LinearGradient>
    )
  }
};

export default ComingSoon;
