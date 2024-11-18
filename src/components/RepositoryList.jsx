import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import Text from './Text';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const Filter = ({ filterBy, setFilterBy }) => {
  const FILTER = {
    latestRepo: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
    highestRated: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
    lowestRated: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  };

  const onValueChange = (itemValue) => {
    switch (itemValue) {
      case 'latest':
        setFilterBy(FILTER.latestRepo);
        break;
      case 'highestRated':
        setFilterBy(FILTER.highestRated);
        break;
      case 'lowestRated':
        setFilterBy(FILTER.lowestRated);
        break;
      default:
        setFilterBy(FILTER.latestRepo);
        break;
    }
  };

  return (
    <Picker
      selectedValue={filterBy}
      onValueChange={onValueChange}
      prompt="Select an item..."
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  );
};

export const RepositoryListContainer = ({
  repositories,
  navigate,
  filterBy,
  setFilterBy,
}) => {
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
      ListHeaderComponent={
        <Filter filterBy={filterBy} setFilterBy={setFilterBy} />
      }
      ListHeaderComponentStyle={{
        marginBlock: 10,
      }}
    />
  );
};

const RepositoryList = () => {
  const [filterBy, setFilterBy] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });

  const navigate = useNavigate();
  const { repositories, loading } = useRepositories(filterBy);

  if (loading) {
    return (
      <View>
        <Text fontWeight="bold">Loading...</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
    />
  );
};

export default RepositoryList;
