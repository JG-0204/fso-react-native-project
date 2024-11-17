import { View, Pressable, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutation';

import useSignIn from '../hooks/useSignIn';

import TextInput from './TextInput';
import Text from './Text';

import theme from '../theme';

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
});

const SignUpFormSchema = yup.object({
  username: yup
    .string()
    .min(5, 'Username should be 5 or more characters')
    .max(30, 'Username should not exceed 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password should be 5 or more characters')
    .max(30, 'Password should not exceed 30 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .required('Password confirmation is required'),
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    const user = {
      username,
      password,
    };

    const { data } = await createUser({
      variables: { user },
    });

    if (!data) {
      console.log('something went wrong');
    }

    await signIn(user);
    navigate('/');
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={SignUpFormSchema}
    >
      {({ handleChange, handleSubmit, touched, errors, values }) => (
        <View style={styles.container}>
          <TextInput
            value={values.username}
            onChangeText={handleChange('username')}
            placeholder={'Username'}
            error={touched.username && errors.username}
          />
          {touched.username && errors.username && (
            <Text color="error">{errors.username}</Text>
          )}
          <TextInput
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder={'Password'}
            error={touched.password && errors.password}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text color="error">{errors.password}</Text>
          )}
          <TextInput
            value={values.passwordConfirmation}
            onChangeText={handleChange('passwordConfirmation')}
            placeholder={'Password confirmation'}
            error={touched.passwordConfirmation && errors.passwordConfirmation}
            secureTextEntry
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text color="error">{errors.passwordConfirmation}</Text>
          )}
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
