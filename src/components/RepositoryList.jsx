import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigate(`/${item.id}`);
          }}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(repository) => repository.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const navigate = useNavigate();

  if (loading) {
    return (
      <View>
        <Text fontWeight="bold">Loading...</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer repositories={repositories} navigate={navigate} />
  );
};

export default RepositoryList;
