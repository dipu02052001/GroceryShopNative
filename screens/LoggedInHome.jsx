import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottomTabNavigator from '../components/BottomTabNavigator';

const features = [
  {
    title: 'Free Delivery',
    desc: 'On orders over ₹499',
    image: require('../assets/free-delivery.png'),
  },
  {
    title: 'Farm-Fresh Produce',
    desc: 'Straight from the farm to your LoggedInHome',
    image: require('../assets/produceImg.jpeg'),
  },
  {
    title: 'Fast Delivery',
    desc: 'Within 2 hours in select cities',
    image: require('../assets/fastImg.png'),
  },
  {
    title: 'Easy Payments',
    desc: 'Multiple secure options',
    image: require('../assets/paymentImg.jpg'),
  },
];

const LoggedInHome = () => {
  const navigation = useNavigation();
  const handleShopping = () => {
    // navigation.navigate('ProductCatelogue')
    navigation.navigate('AddGroceryItem');
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Welcome to FreshBasket!</Text>

          {/* Carousel Placeholder */}
          <View style={styles.carouselPlaceholder}>
            <Text style={styles.carouselText}>[Carousel Coming Soon]</Text>
          </View>

          <Text style={styles.subtitle}>
            Your one-stop shop for fresh groceries delivered straight to your
            doorstep.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleShopping}>
            <Text style={styles.buttonText}>Start Shopping Now</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        </>
      }
      data={features}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image
            source={item.image}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 4,
  },
  row: {
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  carouselPlaceholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    color: '#888',
  },
});

export default LoggedInHome;
