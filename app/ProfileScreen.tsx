import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, SafeAreaView, StyleSheet, Switch } from 'react-native'
import { Dimensions } from 'react-native'
import { Feather, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'

import { useColorScheme } from '@/components/useColorScheme'
import Colors from '@/constants/Colors'
import { Text, View } from '@/components/Themed'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

const screenWidth = Dimensions.get('window').width

type IconProps = {
  name: string
  color: string
  size: number
  iconLibrary?: 'Feather' | 'MaterialIcons' | 'FontAwesome' | 'Entypo'
  style?: object
}

export function LinkIcon({ name, color, size, iconLibrary = 'Feather', style }: IconProps) {
  const IconComponent =
    iconLibrary === 'MaterialIcons'
      ? MaterialIcons
      : iconLibrary === 'FontAwesome'
      ? FontAwesome
      : iconLibrary === 'Feather'
      ? Feather
      : Entypo

  return <IconComponent name={name as never} color={color} size={size} style={style} />
}

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const colorScheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark')
  const router = useRouter()

  const firstLetter = user?.fullName?.givenName
    ? user.fullName.givenName.charAt(0).toUpperCase()
    : ''

  // State to manage theme selection (Dark/Light)

  function handleSignOut() {
    logout()
  }

  // Handle toggling between dark and light mode
  const toggleDarkMode = (value: boolean) => {
    console.log(value)
    setIsDarkMode(value)
    // Set system theme here, persist it as needed (e.g., using AsyncStorage)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
    >
      {/* USER SECTION */}
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

      {/* LINK SECTION */}

      {/* NOTIFICATION */}
      <Pressable
        onPress={() => router.push('/+not-found')}
        style={({ pressed }) => [
          styles.linkContainer,
          {
            backgroundColor: pressed
              ? Colors[colorScheme ?? 'light'].buttonPress
              : Colors[colorScheme ?? 'light'].background,
          },
        ]}
      >
        <LinkIcon
          name='bell'
          color={Colors[colorScheme ?? 'light'].text}
          size={24}
          iconLibrary='Feather'
          style={{ marginLeft: 10 }}
        />
        <Text style={{ fontSize: 16, marginLeft: 10, flex: 1 }}>Notifications</Text>

        <LinkIcon
          name='chevron-right'
          color={Colors[colorScheme ?? 'light'].text}
          size={24}
          iconLibrary='Entypo'
          style={{ marginRight: 20 }}
        />
      </Pressable>

      {/* DARK MODE */}
      <Pressable
        onPress={() => router.push('/+not-found')}
        style={({ pressed }) => [
          styles.linkContainer,
          {
            backgroundColor: pressed
              ? Colors[colorScheme ?? 'light'].buttonPress
              : Colors[colorScheme ?? 'light'].background,
          },
        ]}
      >
        <LinkIcon
          name='dark-mode'
          color={Colors[colorScheme ?? 'light'].text}
          size={24}
          iconLibrary='MaterialIcons'
          style={{ marginLeft: 10 }}
        />
        <Text style={{ fontSize: 16, marginLeft: 10, flex: 1 }}>Dark Mode</Text>

        {/* Toggle Dark Mode */}
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: Colors[colorScheme ?? 'light'].buttonPress, true: '#0cdce7' }}
          thumbColor={isDarkMode ? '#fff' : '#fff'}
        />
      </Pressable>

      {/* LOGOUT BUTTON */}
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
    marginBottom: 50,
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
  linkContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
  },
})
