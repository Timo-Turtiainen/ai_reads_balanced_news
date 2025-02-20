import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, StyleSheet } from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { Text, View } from '@/components/Themed'
import { useAuth } from '@/context/AuthContext'

export default function ProfileScreen() {
  const { logout } = useAuth()
  const colorScheme = useColorScheme()

  function handleSignOut() {
    logout()
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleSignOut}
        style={({ pressed }) => [
          styles.logoutButton,
          {
            backgroundColor: pressed
              ? Colors[colorScheme ?? 'light'].buttonPress
              : Colors[colorScheme ?? 'light'].background,
          },
        ]}
      >
        <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>Logout</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 20 },
})
