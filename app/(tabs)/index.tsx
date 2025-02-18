import React from 'react'
import { View, StyleSheet } from 'react-native'
import NewsFeedScreen from '@/screens/NewsFeedScreen'

export default function Index() {
  return (
    <View style={styles.container}>
      <NewsFeedScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
