import { StyleSheet, View } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import RepositoryView from './RepositoryView';
import CreateReviewForm from './CreateReviewForm';
import SignUpForm from './SignUpForm';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.bgColors.neutral,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path=":repositoryId" element={<RepositoryView />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/addReview" element={<CreateReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
