import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';

import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.bgColors.primary,
  },
  text: {
    paddingLeft: 5,
    paddingVertical: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab style={styles.text} />
    </View>
  );
};

export default AppBar;
