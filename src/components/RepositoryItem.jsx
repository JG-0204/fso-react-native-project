import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

import theme from '../theme';

import formatValue from '../utils/formatValue';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    padding: 10,
    paddingTop: 15,
    backgroundColor: 'white',
    gap: 20,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dataColumn: {
    flex: 1,
    gap: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  languageTag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.bgColors.secondary,
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 1,
  },
  statusData: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.mainContainer} testID="repositoryItem">
      <View style={styles.dataContainer}>
        <Image
          style={styles.image}
          source={{
            uri: repository.ownerAvatarUrl,
          }}
        />
        <View style={styles.dataColumn}>
          <Text fontSize="subheading" fontWeight="bold">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.languageTag}>
            <Text fontWeight="bold" color="primary">
              {repository.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.statusData}>
          <Text fontWeight="bold">
            {formatValue(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statusData}>
          <Text fontWeight="bold">{formatValue(repository.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statusData}>
          <Text fontWeight="bold">{formatValue(repository.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statusData}>
          <Text fontWeight="bold">{formatValue(repository.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
