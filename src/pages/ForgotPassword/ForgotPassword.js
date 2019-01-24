import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { connect } from "react-redux";
import { forgotPassword } from "./../../_actions/forgotPassword";
import { updateAlert } from "./../../_actions/errors";
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from "./../../elements/CustomButton";
import { COLOR_YELLOW } from '../../styles/common';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      emailOnFocus: false,
    };

    this.focusOnEmail = this.focusOnEmail.bind(this);
    this.renderField = this.renderField.bind(this);
    this.submit = this.submit.bind(this);
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

  focusOnEmail() {
    this.setState({
      emailOnFocus: true,
    });
  }

  renderField({label, keyboardType, onFocus, focusState, meta: { touched, error, warning }, input: { onChange, ...restInput } }) {
    return (
      <View style={styles.fieldContainer}>
        <View style={focusState? [styles.inputContainer, styles.inputContainerFocused] : (styles.inputContainer)}>
          <TextInput style={styles.input}
              keyboardType={keyboardType}
              onChangeText={onChange}
              onFocus={onFocus}
              {...restInput}
              placeholder={label}
              placeholderTextColor={"#64748A"}
              autoCapitalize='none'
              selectionColor='#BE9856'
              underlineColorAndroid='transparent'
          />
        </View>
        <View style={styles.errorMessage}>
          {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
      </View>
    );
  };

  submit(values) {
    this.props.forgotPassword(values.email, this.props.navigation);
  }

  render(){
    return (
      <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.outerContainer}>
        <LinearGradient colors={['#0F2037', '#1D3351']} style={styles.container}>
          {this.props.isLoading? (
            <View style={styles.dimmingContainer}>
              <ActivityIndicator size="large" color={COLOR_YELLOW} />
            </View>
          ) : null}
          <Image style={styles.icon} source={require('./images/email-icon.png')} resizeMode='contain'/>
          <View style={styles.fields}>
            <Field
              name="email"
              keyboardType="email-address"
              label="your email"
              onFocus={this.focusOnEmail}
              focusState={this.state.emailOnFocus}
              component={this.renderField}
            />
            <View style={styles.remindeer}>
              <Text style={styles.signinMessage}>Just remembered? <Text style={styles.signinLink} onPress={() => this.props.navigation.navigate('login')}>Sign In</Text></Text>
            </View>
            <View style={styles.btn}>
              <CustomButton title="Send" onPress={this.props.handleSubmit(this.submit)} />
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
};

const ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  validate
})(ForgotPassword);

const mapStateToProps = (state) => {
    return {
        succeeded: state.forgotPasswordSucceeded,
        hasErrored: state.forgotPasswordFailed,
        isLoading: state.forgotPasswordLoading,
        errorMessage: state.alertMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email, navigation) => dispatch(forgotPassword(email, navigation)),
        updateAlert: (message) => dispatch(updateAlert(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  icon: {
    height: 130,
    marginBottom: 50,
  },
  fieldContainer:{
    height: 80,
    width: 290,
  },
  inputContainer:{
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderRadius: 30,
    borderColor: '#64748A',
    backgroundColor: '#243C5A'
  },
  inputContainerFocused: {
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  input: {
    flexDirection: 'row',
    flex: 1,
    color: "white",
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Helvetica',
    fontSize: 20,
  },
  errorMessage: {
    alignSelf: 'center',
    marginTop: 1,
  },
  reminder: {
    alignItems: 'center',
  },
  signinMessage: {
    alignSelf: 'center',
    fontFamily: 'Helvetica',
    fontSize: 16,
    color: '#64748A'
  },
  signinLink: {
    color: '#BD9756',
    textDecorationLine: 'underline',
  },
  btn: {
    marginTop: 80,
  }
});