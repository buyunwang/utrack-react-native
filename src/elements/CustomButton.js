import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

class CustomButton extends Component {
   render() {
     return(
       <View style={{zIndex: 100}}>
        <Button
          title={this.props.title}
          onPress={this.props.onPress}
          fontFamily='Helvetica'
          fontSize={19}
          buttonStyle={{
            backgroundColor: "#bf9951",
            width: 150,
            height: 54,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 100,
            alignSelf:"center"
          }}
        />
      </View>
     )
   }
 }

export default CustomButton;
