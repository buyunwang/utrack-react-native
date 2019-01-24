import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from "./../../elements/CustomButton";
import GoBack from "./../../elements/GoBack";
import { connect } from 'react-redux';
import { login } from './../../_actions/login';
import { updateAlert } from "./../../_actions/errors";
import { COLOR_YELLOW } from "../../styles/common";

const validate = values => {
  const errors = {};
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '0',
      username: '',
      password: '',
      emailOnFocus: false,
      passwordOnFocus: false,
    };

    this.focusOnEmail = this.focusOnEmail.bind(this);
    this.focusOnPassword = this.focusOnPassword.bind(this);
    this.renderField = this.renderField.bind(this);
    this.submit = this.submit.bind(this);
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

  focusOnEmail() {
    this.setState({
      emailOnFocus: true,
      passwordOnFocus: false,
    });
  }

  focusOnPassword() {
    this.setState({
      emailOnFocus: false,
      passwordOnFocus: true
    });
  }

  renderField({label, keyboardType, onFocus, focusState, secureTextEntry, meta: { touched, error, warning }, input: { onChange, ...restInput } }) {
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
              secureTextEntry={secureTextEntry}
              underlineColorAndroid='transparent'
          />
          {label=='password' ? (
            <Text style={styles.forgotBtn} onPress={()=>this.props.navigation.navigate('forgotPassword')}>Forgot!</Text>
          ) : null}
        </View>
        <View style={styles.errorMessage}>
          {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
      </View>
    );
  };

  submit(values) {
    this.props.login(values, this.props.navigation);
  }

  render(){
    return (
      <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.outerContainer}>
        <GoBack onPress={() => this.props.navigation.goBack()}/>
        {this.props.isLoading ? (
          <View style={styles.dimmingContainer}>
            <ActivityIndicator size="large" color={COLOR_YELLOW} />
          </View>
        ) : null}
        <LinearGradient colors={['#0F2037', '#1D3351']} style={styles.container}>
          <Image style={styles.icon} source={require('./images/profilePic.png')} resizeMode='contain'/>
          <View style={styles.fields}>
            <Field
              name="email"
              keyboardType="email-address"
              label="email"
              onFocus={this.focusOnEmail}
              focusState={this.state.emailOnFocus}
              component={this.renderField}
            />
            <Field
              name="password"
              keyboardType="default"
              label="password"
              onFocus={this.focusOnPassword}
              focusState={this.state.passwordOnFocus}
              component={this.renderField}
              secureTextEntry={true}
            />
            <View style={styles.btn}>
              <CustomButton title="Enter" onPress={this.props.handleSubmit(this.submit)}/>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const LoginForm = reduxForm({
  form: 'login',
  validate
})(Login);

const mapStateToProps = (state) => {
  return {
    response: state.loginResponse,
    hasErrored: state.loginFailed,
    isLoading: state.loginLoading,
    errorMessage: state.alertMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (values, navigation) => dispatch(login(values, navigation)),
    updateAlert: (message) => dispatch(updateAlert(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dimmingContainer: {
    zIndex: 1000,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.3)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    height: 150,
    marginBottom: 20
  },
  fieldContainer: {
    height: 80,
    width: 290
  },
  inputContainer: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    borderRadius: 30,
    borderColor: "#64748A",
    backgroundColor: "#243C5A"
  },
  inputContainerFocused: {
    borderWidth: 1,
    backgroundColor: "transparent"
  },
  input: {
    flexDirection: "row",
    flex: 1,
    color: "white",
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: "Helvetica",
    fontSize: 20
  },
  errorMessage: {
    alignSelf: "center",
    marginTop: 1
  },
  forgotBtn: {
    color: "#BD9756",
    marginRight: 20,
    fontFamily: "Helvetica",
    fontSize: 18
  },
  btn: {
    marginTop: 20
  }
});
