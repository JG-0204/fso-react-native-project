import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';

import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutation';
import { useNavigate } from 'react-router-native';

import formatDate from '../utils/formatDate';
import theme from '../theme';

import Text from './Text';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  review: {
    flex: 1,
    backgroundColor: 'white',
    gap: 5,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 15,
  },
  ratingContainer: {
    width: 55,
    height: 55,
    borderWidth: 3,
    borderColor: theme.bgColors.secondary,
    borderStyle: 'solid',
    borderRadius: 27.5,
    display: 'flex',
    justifyContent: 'center',
  },
  reviewContainer: {
    flex: 1,
    gap: 4,
  },
  reviewTextContainer: {
    width: 325,
  },
  rating: {
    color: theme.bgColors.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingInline: 5,
    width: 200,
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  viewRepositoryButton: {
    width: '100%',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: theme.bgColors.secondary,
  },
  deleteButton: {
    width: '100%',
    borderRadius: 3,
    paddingVertical: 15,
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    textAlign: 'center',
  },
});

const Reviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    console.log(error.message);
  }

  const userReviews = data?.me?.reviews?.edges?.map((edge) => edge.node);

  return (
    <FlatList
      data={userReviews}
      renderItem={({ item }) => <UserReviewItem review={item} />}
      keyExtractor={(review) => review.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const UserReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [ME],
  });

  const onDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () =>
            deleteReview({
              variables: { deleteReviewId: review.id },
            }),
        },
      ]
    );
  };

  return (
    <View style={styles.review}>
      <View style={styles.mainContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating} fontSize="subheading" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary" fontSize="subheading">
            {formatDate(review.createdAt)}
          </Text>
          <View style={styles.reviewTextContainer}>
            <Text fontSize="subheading">{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigate(`/${review.repository.id}`)}
          style={styles.viewRepositoryButton}
        >
          <Text
            style={styles.buttonText}
            fontSize="subheading"
            fontWeight="bold"
            color="primary"
          >
            View repository
          </Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text
            style={styles.buttonText}
            fontSize="subheading"
            fontWeight="bold"
            color="primary"
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Reviews;
