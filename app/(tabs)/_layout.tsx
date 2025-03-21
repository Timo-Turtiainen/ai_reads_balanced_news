import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import ProfileIconButton from '@/components/ProfileIconButton'
import { useAuth } from '@/context/AuthContext'
import { View } from '@/components/Themed'
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Entypo>['name']
  color: string
  size: number
}) {
  return <Entypo style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  const { user } = useAuth()
  const firstLetter = user?.fullName?.givenName
    ? user.fullName.givenName.charAt(0).toUpperCase()
    : ''

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} size={28} />,

          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Link href='/ProfileScreen' asChild>
                <ProfileIconButton
                  firstLetter={firstLetter}
                  color={Colors[colorScheme ?? 'light'].text}
                />
              </Link>
            </View>
          ),
          headerRight: () => (
            <Link href='/' asChild>
              <Pressable>
                {({ pressed }) => (
                  <Entypo
                    name='menu'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='recent'
        options={{
          title: 'Recent',
          headerTintColor: Colors[colorScheme ?? 'light'].text,
          tabBarIcon: ({ color }) => <TabBarIcon name='news' color={color} size={28} />,
        }}
      />
    </Tabs>
  )
}
