import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});

const AppBarTab = ({ style }) => {
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

      <Link to="/login">
        <Text
          fontWeight="bold"
          color="primary"
          fontSize="subheading"
          style={style}
        >
          Sign-in
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
