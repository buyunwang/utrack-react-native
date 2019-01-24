import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import CustomButton from '../../elements/CustomButton';

class Landing extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    if (this.props.authToken) {
      this.props.navigation.navigate('dashboard');
      return null;
    } else {
      return (
        <LinearGradient colors={['#0d1826', '#1d3351']} style={styles.container}>
          <Image style={styles.logo} source={require("./images/logo.png")} resizeMode = "contain"/>
          <Text style ={styles.text} > Guiding All Students Along The Path To Success</Text>
          <CustomButton title='Get Started' onPress={()=>this.props.navigation.navigate('signup')}/>
          <Text style={styles.loginBtn} onPress={()=>this.props.navigation.navigate('login')}>Log In</Text>
        </LinearGradient>
      );
    }
  }
};

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken
  };
};

export default connect(mapStateToProps)(Landing);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 280,
        height: 180,
        marginTop: 90
    },
    text: {
        fontSize: 19,
        fontFamily: 'Helvetica',
        textAlign: 'center',
        lineHeight: 30,
        marginLeft: 20,
        marginRight: 20,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    loginBtn: {
        fontFamily: 'Helvetica',
        color: '#A4ADB8',
        fontSize: 19,
        textDecorationLine: 'underline',
        marginBottom: 30,
    }
});
