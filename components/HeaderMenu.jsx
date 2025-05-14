// HeaderMenu.js
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HeaderMenu = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 15 }}>
          <Icon name="account-circle" size={32} color="white" />
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
