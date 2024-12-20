import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import Text from './Text';

import useRepository from '../hooks/useRepository';
import theme from '../theme';
import formatDate from '../utils/formatDate';

const RepositoryViewContainer = ({ reviews, repository, onEndReached }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryView = () => {
  const { repositoryId } = useParams();

  const { reviews, repository, loading, fetchMore } = useRepository({
    repositoryId,
    first: 8,
  });

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RepositoryViewContainer
      reviews={reviews}
      repository={repository}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    backgroundColor: 'white',
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} fontSize="subheading" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          {formatDate(review.createdAt)}
        </Text>
        <View style={styles.reviewTextContainer}>
          <Text fontSize="subheading">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryView;
