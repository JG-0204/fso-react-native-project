import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: theme.colors.neutral,
    borderRadius: 3,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ error, ...props }) => {
  const textInputStyle = [styles.textInput, error && styles.errorBorder];

  return <NativeTextInput {...props} style={textInputStyle} />;
};

export default TextInput;
