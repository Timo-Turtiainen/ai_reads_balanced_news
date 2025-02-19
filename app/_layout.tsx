import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { StyleSheet } from 'react-native'

import { useColorScheme } from '@/components/useColorScheme'
import { View } from '@/components/Themed'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import Login from '@/app/LoginScreen'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const { user } = useAuth()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? (
        <Stack
          screenOptions={{
            headerBackTitle: '',
          }}
        >
          <Stack.Screen name='(tabs)' options={{ headerShown: false, headerTitle: ' ' }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
          <Stack.Screen name='NewsScreen' options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      ) : (
        <View style={styles.login}>
          <Login />
        </View>
      )}
    </ThemeProvider>
  )
}
const styles = StyleSheet.create({
  login: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 70,
  },
})
