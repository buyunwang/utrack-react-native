import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import goback from './images/goback.png';

const styles = StyleSheet.create({
  goback: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 30,
    zIndex: 100,
  },
  icon: {
    height: 20,
    width: 30,
  }
});

class GoBack extends Component {
   render() {
     return(
       <TouchableOpacity style={styles.goback} activeOpacity={0.9} onPress={this.props.onPress}>
         <Image style={styles.icon} source={goback} resizeMode='contain'/>
       </TouchableOpacity>
     )
   }
 }

export default GoBack;
