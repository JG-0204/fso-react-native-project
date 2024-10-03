import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ style }) => {
  return (
    <Pressable>
      <Text
        fontWeight="bold"
        color="primary"
        fontSize="subheading"
        style={style}
      >
        Repositories
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
