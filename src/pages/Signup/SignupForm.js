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
import { signup } from "./../../_actions/signup";
import { updateAlert } from "./../../_actions/errors";
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from "./../../elements/CustomButton";
import GoBack from "./../../elements/GoBack";
import { COLOR_YELLOW } from '../../styles/common';

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'Required';
  }
  if (!values.lastname) {
    errors.lastname = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password cannot be shorter than 8 digits';
  }
  return errors;
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailOnFocus: false,
      passwordOnFocus: false,
      firstNameFocus:false,
      LastNameFocus:false
    };

    this.focusOnEmail = this.focusOnEmail.bind(this);
    this.focusOnPassword = this.focusOnPassword.bind(this);
    this.focusOnFirstName = this.focusOnFirstName.bind(this);
    this.focusOnLastName = this.focusOnLastName.bind(this);
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
      passwordOnFocus: false,
      firstNameFocus: false,
      LastNameFocus: false,
    });
  }

  focusOnPassword() {
    this.setState({
      emailOnFocus: false,
      passwordOnFocus: true,
      firstNameFocus: false,
      LastNameFocus: false,
    });
  }

  focusOnFirstName() {
    this.setState({
      emailOnFocus: false,
      passwordOnFocus: false,
      firstNameFocus: true,
      LastNameFocus: false,
    });
  }

  focusOnLastName() {
    this.setState({
      emailOnFocus: false,
      passwordOnFocus: false,
      firstNameFocus: false,
      LastNameFocus: true
    });
  }

  renderField({autoCapitalize, width, toggle, onFocus, focusState, label, keyboardType, secureTextEntry, meta: {touched, error, warning}, input: {onChange, ...restInput}}) {
    return (
      <View style={[styles.fieldContainer, {width: width}]}>
        <View style={focusState? [styles.inputContainer, styles.inputContainerFocused] : (styles.inputContainer)}>
          <TextInput style={styles.input}
            keyboardType={keyboardType}
            onChangeText={onChange}
            onFocus={onFocus}
            { ...restInput}
            placeholder={label}
            placeholderTextColor={"#64748A"}
            autoCapitalize={autoCapitalize}
            selectionColor='#BE9856'
            secureTextEntry={secureTextEntry}
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={styles.errorMessage}>
          {touched && ((error && <Text style={{ color: 'red' }} > {error} </Text>) ||
          (warning && <Text style={ { color: 'orange' }} > { warning } </Text>))}
        </View>
      </View>
    );
  }
  
  submit(values) {
    this.props.signup(values, this.props.navigation);
  }

  render(){
    return (
      <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.outerContainer}>
        <GoBack onPress={() => this.props.navigation.goBack()}/>
        {this.props.isLoading? (
          <View style={styles.dimmingContainer}>
            <ActivityIndicator size="large" color={COLOR_YELLOW} />
          </View>
         ) : null}
        <LinearGradient colors = {['#0F2037', '#1D3351']} style={styles.container}>
          <GoBack onPress={() => this.props.navigation.navigate('landing')}/>
          <Image style={styles.icon} source={require("./images/profilePic.png")} resizeMode="contain"/>
          <View style={styles.fields}>
            <View style={{flexDirection:"row", justifyContent: 'space-between'}}>
              <Field
                name="firstname"
                keyboardType="default"
                label="first name"
                component={this.renderField}
                width={140}
                toggle={true}
                autoCapitalize='sentences'
                onFocus={this.focusOnFirstName}
                focusState={this.state.firstNameFocus}
              />
              <Field
                name="lastname"
                keyboardType="default"
                label="last name"
                component={this.renderField}
                width={140}
                toggle={true}
                autoCapitalize='sentences'
                onFocus={this.focusOnLastName}
                focusState={this.state.LastNameFocus}
              />
            </View>
            <Field
              name="email"
              keyboardType="email-address"
              label="email"
              component={this.renderField}
              width={290}
              autoCapitalize='none'
              onFocus={this.focusOnEmail}
              focusState={this.state.emailOnFocus}
            />
            <Field
              name="password"
              keyboardType="default"
              label="password"
              component={this.renderField}
              width={290}
              autoCapitalize='none'
              onFocus={this.focusOnPassword}
              focusState={this.state.passwordOnFocus}
              secureTextEntry={true}
            />
            <View style={styles.btn}>
              <CustomButton title="Join" onPress={this.props.handleSubmit(this.submit)}/>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const SignupForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

const mapStateToProps = (state) => {
    return {
        response: state.signupResponse,
        hasErrored: state.signupFailed,
        isLoading: state.signupLoading,
        errorMessage: state.alertMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (values, navigation) => dispatch(signup(values, navigation)),
        updateAlert: (message) => dispatch(updateAlert(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

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
    height: 150,
  },
  fieldContainer: {
    height: 80,
  },
  inputContainer: {
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
    color: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: 'Helvetica',
    fontSize: 20,
  },
  errorMessage: {
    alignSelf: 'center',
    marginTop: 1,
  },
  btn: {
    marginTop: 20,
  },
});