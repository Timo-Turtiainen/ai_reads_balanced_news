import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, SafeAreaView, StyleSheet } from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { Text, View } from '@/components/Themed'
import { useAuth } from '@/context/AuthContext'

import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const colorScheme = useColorScheme()

  const firstLetter = user?.fullName?.givenName
    ? user.fullName.givenName.charAt(0).toUpperCase()
    : ''

  function handleSignOut() {
    logout()
  }

  return (
    <SafeAreaView>
      <View style={styles.userContainer}>
        <View style={styles.icon}>
          <Text style={styles.text}>{firstLetter}</Text>
        </View>
        <View>
          <Text style={styles.user}>
            {user?.fullName?.givenName} {user?.fullName?.familyName}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 20, alignItems: 'center' }}>
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
          <Text style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Logout
          </Text>
        </Pressable>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    width: screenWidth,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  email: {
    fontSize: 15,
    marginLeft: 10,
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
  logoutText: { fontSize: 16, fontWeight: 'bold' },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
})
