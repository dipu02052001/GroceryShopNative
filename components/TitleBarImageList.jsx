import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 2 - 20;

const TitlebarImageList = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://groceryshop-spring-backend.onrender.com/api/prodCatelogue/getProdCatelogue')
      .then((res) => {
        setItemData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.author}</Text>
    </View>
  );

  return (
    <FlatList
      data={itemData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: itemWidth,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default TitlebarImageList;
