import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import Text from './Text';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const submit = ({ username, password }) =>
  console.log(`\n Username: ${username} \n Password: ${password}`);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: theme.colors.primary,
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: theme.bgColors.neutral,
    borderRadius: 3,
  },
  button: {
    borderRadius: 3,
    backgroundColor: theme.bgColors.secondary,
    paddingVertical: 15,
  },
  buttonText: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
});

const SignIn = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={submit}>
      {({ handleSubmit, handleChange, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={values.username}
            placeholder="Username"
            onChangeText={handleChange('username')}
          />
          <TextInput
            style={styles.input}
            value={values.password}
            placeholder="Password"
            onChangeText={handleChange('password')}
            secureTextEntry
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
