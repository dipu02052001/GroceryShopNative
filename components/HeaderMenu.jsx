// HeaderMenu.js
import React, { useState } from 'react';
import { TouchableOpacity,Image } from 'react-native';
import { Menu } from 'react-native-paper';


const HeaderMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
            <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 15 }}>
        <Image
          source={require('../assets/user.png')} // ✅ Update the path to your actual image
          style={{ width: 32, height: 32, borderRadius: 16 }} // Adjust styling as needed
        />
      </TouchableOpacity>
      }>
      <Menu.Item onPress={() => { setVisible(false); navigation.navigate('Home'); }} title="Login" />
      {/* <Menu.Item onPress={() => { setVisible(false); navigation.replace('LoggedInHome'); }} title="Logout" /> */}
      <Menu.Item onPress={() => { setVisible(false); navigation.navigate('ContactUs'); }} title="Contact" />
      <Menu.Item onPress={() => { setVisible(false); navigation.navigate('About'); }} title="About" />
    </Menu>
  );
};

export default HeaderMenu;
