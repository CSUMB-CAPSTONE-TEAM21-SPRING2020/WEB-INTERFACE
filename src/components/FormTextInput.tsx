import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../config/colors";

type Props = TextInputProps;

class FormTextInput extends React.Component<Props> {

  // Create a React ref that will be used to store the
  // TextInput reference
  textInputRef = React.createRef<TextInput>();

  // Expose a `focus` method that will allow us to focus
  // the TextInput
  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render() {
    const { style, ...otherProps } = this.props;
    return (
      <TextInput
        ref={this.textInputRef}
        style={[styles.textInput, style]}
        selectionColor={colors.DODGER_BLUE}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.FRENCH_GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});

export default FormTextInput;