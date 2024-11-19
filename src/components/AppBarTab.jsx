import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';

import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

const AppBarTab = ({ style }) => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <View style={styles.container}>
      <Link to="/">
        <Text
          fontWeight="bold"
          color="primary"
          fontSize="subheading"
          style={style}
        >
          Repositories
        </Text>
      </Link>

      {data?.me ? (
        <View style={styles.formContainer}>
          <Link to="/addReview">
            <Text
              fontWeight="bold"
              color="primary"
              fontSize="subheading"
              style={style}
            >
              Create a review
            </Text>
          </Link>
          <Link to="/reviews">
            <Text
              fontWeight="bold"
              color="primary"
              fontSize="subheading"
              style={style}
            >
              My reviews
            </Text>
          </Link>
          <Pressable onPress={onSignOut}>
            <Text
              fontWeight="bold"
              color="primary"
              fontSize="subheading"
              style={style}
            >
              Sign Out
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Link to="/login">
            <Text
              fontWeight="bold"
              color="primary"
              fontSize="subheading"
              style={style}
            >
              Sign In
            </Text>
          </Link>
          <Link to="/signup">
            <Text
              fontWeight="bold"
              color="primary"
              fontSize="subheading"
              style={style}
            >
              Sign Up
            </Text>
          </Link>
        </View>
      )}
    </View>
  );
};

export default AppBarTab;
