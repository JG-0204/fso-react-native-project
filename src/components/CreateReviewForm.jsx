import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';

import * as yup from 'yup';

import Text from '../components/Text';
import TextInput from './TextInput';

import theme from '../theme';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutation';
import { useNavigate } from 'react-router-native';

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

const ReviewSchema = yup.object({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number('Invalid number')
    .min(0)
    .max(100, 'Rating should not exceed 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const CreateReviewForm = () => {
  const [createReview] = useMutation(ADD_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const review = { ...values, rating: Number(values.rating) };

    const { data } = await createReview({
      variables: { review },
    });

    if (!data) {
      console.log('something went wrong');
    }

    navigate(`/${data.createReview.repositoryId}`);
  };

  return (
    <View>
      <Formik
        initialValues={{
          ownerName: '',
          repositoryName: '',
          rating: null,
          text: '',
        }}
        onSubmit={onSubmit}
        validationSchema={ReviewSchema}
      >
        {({ handleChange, handleSubmit, touched, errors, values }) => (
          <View style={styles.container}>
            <TextInput
              value={values.ownerName}
              onChangeText={handleChange('ownerName')}
              placeholder="Repository owner name"
              error={touched.ownerName && errors.ownerName}
            />
            {touched.ownerName && errors.ownerName && (
              <Text color="error">{errors.ownerName}</Text>
            )}
            <TextInput
              value={values.repositoryName}
              onChangeText={handleChange('repositoryName')}
              placeholder="Repository name"
              error={touched.repositoryName && errors.repositoryName}
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text color="error">{errors.repositoryName}</Text>
            )}
            <TextInput
              value={values.rating}
              onChangeText={handleChange('rating')}
              placeholder="Your rating(0-100)"
              error={touched.rating && errors.rating}
            />
            {touched.rating && errors.rating && (
              <Text color="error">{errors.rating}</Text>
            )}
            <TextInput
              value={values.text}
              multiline={true}
              numberOfLines={4}
              onChangeText={handleChange('text')}
              placeholder="Your review"
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReviewForm;
