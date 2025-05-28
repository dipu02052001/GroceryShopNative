import { ScrollView, StyleSheet, Text, View } from 'react-native'


const Profile = () => {
  return (
    <ScrollView>
      <Text>Profile</Text>
      <View>
        <Contact/>
        <About/>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({})