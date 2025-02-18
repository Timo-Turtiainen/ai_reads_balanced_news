import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'

import { Text, View } from '@/components/Themed'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@/context/AuthContext'

export default function ProfileScreen() {
  const router = useRouter()
  const { user, setUser } = useAuth()
  useEffect(() => {
    async function loadUser() {
      const userData = await AsyncStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
    loadUser()
  }, [])

  async function handleSignOut() {
    await AsyncStorage.removeItem('user')
    setUser(null)
    router.navigate('/')
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
          styles.logoutButton,
          { backgroundColor: pressed ? Colors.dark.buttonPress : Colors.dark.background },
        ]}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logoutButton: {
    width: 200,
    height: 44,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    // backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 20 },
})
