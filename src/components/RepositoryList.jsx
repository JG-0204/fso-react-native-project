import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(repository) => repository.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return (
      <View>
        <Text fontWeight="bold">Loading...</Text>
      </View>
    );
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
