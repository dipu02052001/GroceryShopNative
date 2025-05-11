import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';

export default function ProductCategoriesScreen() {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'T-Shirts',
      image: { uri: 'data:image/jpeg;base64,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' },
    },
    {
      id: '2',
      name: 'Shirts',
      image: { uri: 'https://via.placeholder.com/100x100.png?text=Shirt' },
    },
    {
      id: '3',
      name: 'Jeans',
      image: { uri: 'https://via.placeholder.com/100x100.png?text=Jeans' },
    },
    {
      id: '4',
      name: 'Jackets',
      image: { uri: 'https://via.placeholder.com/100x100.png?text=Jacket' },
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);

  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);

  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          // Android 13+ (API 33+)
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Media Access Permission',
              message: 'App needs access to your images to upload category photos.',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          // Android 12 and below
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to upload category photos.',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } else {
        return true; // iOS
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  
  const handleImagePick = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access media without permission.');
      return;
    }
  
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response?.assets?.length) {
        setNewCategoryImage({ uri: response.assets[0].uri });
      }
    });
  };

  const handleEditImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response?.assets?.length) {
        setEditImage({ uri: response.assets[0].uri });
      }
    });
  };

  const handleSubmit = () => {
    if (!newCategoryName) {
      Alert.alert('Error', 'Please enter a category name.');
      return;
    }

    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      image:
        newCategoryImage || {
          uri: 'https://via.placeholder.com/100x100.png?text=No+Image',
        },
    };

    setCategories([newCategory, ...categories]);
    setNewCategoryName('');
    setNewCategoryImage(null);
    setShowForm(false);
    Alert.alert('Success', 'Category added');
  };

  const handleEditSubmit = () => {
    if (!editName) {
      Alert.alert('Error', 'Please enter a category name.');
      return;
    }

    const updatedList = categories.map((cat) =>
      cat.id === editingCategory.id
        ? { ...cat, name: editName, image: editImage }
        : cat
    );

    setCategories(updatedList);
    setEditingCategory(null);
    setEditName('');
    setEditImage(null);
    Alert.alert('Success', 'Category updated');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setCategories(categories.filter((item) => item.id !== id));
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const startEdit = (item) => {
    setEditingCategory(item);
    setEditName(item.name);
    setEditImage(item.image);
    setShowForm(false); // Hide create form
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity onPress={() => startEdit(item)}>
        <Text style={styles.link}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.link}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Categories</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setShowForm(!showForm);
            setEditingCategory(null); // Cancel edit mode
          }}
        >
          <Text style={styles.addText}>+ Add Category</Text>
        </TouchableOpacity>
      </View>

      {/* Create Form */}
      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Create New Category</Text>

          <TouchableOpacity style={styles.imageUpload} onPress={handleImagePick}>
            <Text style={styles.link}>Upload Category Image</Text>
          </TouchableOpacity>

          {newCategoryImage && (
            <Image source={newCategoryImage} style={styles.preview} />
          )}

          <TextInput
            placeholder="Enter category name"
            style={styles.input}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Edit Form */}
      {editingCategory && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Edit Category</Text>

          <TouchableOpacity style={styles.imageUpload} onPress={handleEditImagePick}>
            <Text style={styles.link}>Change Image</Text>
          </TouchableOpacity>

          {editImage && <Image source={editImage} style={styles.preview} />}

          <TextInput
            placeholder="Edit category name"
            style={styles.input}
            value={editName}
            onChangeText={setEditName}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleEditSubmit}>
            <Text style={styles.submitText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  addText: { color: '#fff', fontSize: 14 },
  list: { paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  image: { width: 48, height: 48, marginRight: 12, resizeMode: 'cover', borderRadius: 5 },
  name: { flex: 1, fontSize: 16, fontWeight: '600' },
  link: { color: '#007BFF', marginLeft: 10 },

  form: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  imageUpload: { marginBottom: 10 },
  preview: { width: 80, height: 80, marginBottom: 10, borderRadius: 5 },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '600' },
});