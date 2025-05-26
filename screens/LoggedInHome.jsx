import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../store/useUserStore';
import React, { useState, useRef } from 'react';

const { width } = Dimensions.get('window');

const carouselData = [
  { id: '1', image: require('../assets/grocery_1.jpg') },
  { id: '2', image: require('../assets/grocery_2.jpg') },
  { id: '3', image: require('../assets/grocery_3.jpg') },
  { id: '4', image: require('../assets/grocery_4.jpg') },
  { id: '5', image: require('../assets/grocery_5.jpg') },
];

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
  const user = useUserStore(state => state.user);
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleShopping = () => {
    if (!user) {
      Alert.alert('Please login to start buying');
    } else {
      navigation.navigate('AddGroceryItem');
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome {user?.name}!</Text>

      
      <View>
        <FlatList
          data={carouselData}
          ref={carouselRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Image source={item.image} style={styles.carouselImage} />
          )}
        />
        <View style={styles.pagination}>
          {carouselData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <Text style={styles.subtitle}>
        Your one-stop shop for fresh groceries delivered straight to your
        doorstep.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleShopping}>
        <Text style={styles.buttonText}>Start Shopping Now</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Why Choose Us?</Text>

      {/* Features (Not FlatList) */}
      <View style={styles.featureList}>
        {features.map((item, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
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
  carouselImage: {
    width: width,
    height: 150,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1976d2',
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
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
});

export default LoggedInHome;
