import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitlebarImageList from '../components/TitleBarImageList'

const ProductCatelogue = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', width : '100%'}}>
      <TitlebarImageList/>

      
    </View>
  )
}

export default ProductCatelogue

const styles = StyleSheet.create({})