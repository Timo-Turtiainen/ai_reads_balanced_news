import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import NewsFeedScreen from '@/screens/NewsFeedScreen'
import Login from '@/screens/LoginScreen'

export default function Index() {
  const [user, setUser] = useState<AppleAuthentication.AppleAuthenticationCredential | null>(null)
  return (
    <View style={styles.container}>
      {user ? (
        <NewsFeedScreen />
      ) : (
        <View style={styles.login}>
          <Login onLoginSuccess={setUser} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
