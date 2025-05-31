import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  InteractionManager,
} from 'react-native';
import { Button, List, Divider, Card } from 'react-native-paper';
import useUserStore from '../store/useUserStore';

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    useUserStore.getState().clearUser();
                          navigation.reset({
                            index: 0,
                            routes: [{name: 'LoggedInHome'}],
                    })
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.storeCard}>
        <Card.Title
          title="Grocery Store"
          subtitle="Fresh Grocery Store Near Me"
          left={() => (
            <Image
              source={require('../assets/home.png')}
              style={styles.icon}
            />
          )}
          right={() => <Button textColor="green">Open Now</Button>}
        />
      </Card>

      <View style={styles.menu}>
        <List.Item
          title="My Orders"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => navigation.navigate('Cart')}
        />
        <List.Item
          title="Saved Addresses"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => {}}
        />
        <List.Item
          title="Help & support"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => navigation.navigate('ContactUs')}
        />
        <List.Item
          title="Change Language"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => {}}
        />
        <List.Item
          title="Rate Us"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => {}}
        />
        <List.Item
          title="About Us"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => navigation.navigate('About')}
        />
        <List.Item
          title="Share Feedback"
          titleStyle={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}
          left={() => (
            <Image
              source={require('../assets/cart.jpeg')}
              style={styles.icon}
            />
          )}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Logout"
          titleStyle={{ color: 'red' }}
          left={() => (
            <Image
              source={require('../assets/home.png')}
              style={styles.icon}
            />
          )}
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  storeCard: {
    marginBottom: 20,
    borderRadius: 14,
    elevation: 6,
  },
  menu: {
    marginTop: 10,
    textColor :'green'
  },
  icon: {
    width: 29,
    height: 24,
    marginRight: 16,
    alignSelf: 'center',
  },
});

export default Profile;
