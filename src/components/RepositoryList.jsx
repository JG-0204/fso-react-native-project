import { FlatList, View, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import Text from './Text';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <Searchbar
    placeholder="Search repository"
    onChangeText={setSearchQuery}
    value={searchQuery}
  />
);

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
  searchQuery,
  setSearchQuery,
  onEndReached,
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
        <View>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Filter filterBy={filterBy} setFilterBy={setFilterBy} />
        </View>
      }
      ListHeaderComponentStyle={{
        marginBlock: 10,
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [filterBy, setFilterBy] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const navigate = useNavigate();
  const { repositories, loading, fetchMore } = useRepositories(
    filterBy,
    debouncedSearchQuery,
    {
      first: 8,
    }
  );

  if (loading) {
    return (
      <View>
        <Text fontWeight="bold">Loading...</Text>
      </View>
    );
  }

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReached={onEndReached}
    />
  );
};

export default RepositoryList;
