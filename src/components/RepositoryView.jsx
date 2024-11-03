import { View, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';

import RepositoryItem from './RepositoryItem';

import { GET_REPOSITORY } from '../graphql/queries';

const RepositoryView = () => {
  const { repositoryId } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
  });

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return <RepositoryItem repository={data.repository} />;
};

export default RepositoryView;
