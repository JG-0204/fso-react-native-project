import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

import Text from './Text';
import TextInput from './TextInput';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const SignInSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username should be 4 or more characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password should be 4 or more characters long')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: theme.colors.primary,
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
  errorText: {
    color: theme.colors.error,
  },
});

export const SignInContainer = ({ submit }) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={SignInSchema}
      >
        {({ handleSubmit, handleChange, touched, errors, values }) => (
          <SignInForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            touched={touched}
            errors={errors}
            values={values}
          />
        )}
      </Formik>
    </View>
  );
};

const SignInForm = ({
  handleSubmit,
  handleChange,
  touched,
  errors,
  values,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={values.username}
        placeholder="Username"
        onChangeText={handleChange('username')}
        error={touched.username && errors.username}
      />
      {touched.username && errors.username && (
        <Text color="error">{errors.username}</Text>
      )}
      <TextInput
        value={values.password}
        placeholder="Password"
        onChangeText={handleChange('password')}
        secureTextEntry
        error={touched.password && errors.password}
      />
      {touched.password && errors.password && (
        <Text color="error">{errors.password}</Text>
      )}
      <Pressable
        onPress={handleSubmit}
        style={styles.button}
        testID="submitButton"
      >
        /<Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const submit = async ({ username, password }) => {
    try {
      await signIn({
        username,
        password,
      });
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignInContainer submit={submit} />;
};

export default SignIn;
