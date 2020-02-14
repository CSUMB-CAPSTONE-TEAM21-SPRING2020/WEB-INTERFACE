import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";

//images are broken for some damn reason
//import * as imageLogo from "../assets/icon.png";

interface State {
  email: string;
  password: string;
}

class LoginScreen extends React.Component<{}, State> {
  // Again, create a React ref for storing the FormTextInput
  // reference
  passwordInputRef = React.createRef<FormTextInput>();

  readonly state: State = {
    email: "",
    password: ""
  };

  handleEmailChange = (email: string) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  // When the "next" button is pressed, focus the password
  // input
  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleLoginPress = () => {
    console.log("Login button pressed");
  };

  render() {
    return (
      //Adjust/move screen in response to keyboard
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder="Email"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <FormTextInput
            ref={this.passwordInputRef}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder="Password"
            secureTextEntry={true}
            returnKeyType="done"
          />
          <Button
            label="Log In"
            onPress={this.handleLoginPress}
          />
        </View>
      </KeyboardAvoidingView>
      //End adjusted content
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default LoginScreen;