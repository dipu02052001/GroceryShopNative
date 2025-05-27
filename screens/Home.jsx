import {View} from 'react-native';
import LoginForm from '../components/LoginForm';

const Home = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', width: '100%'}}>
      <LoginForm />
    </View>
  );
};

export default Home;
