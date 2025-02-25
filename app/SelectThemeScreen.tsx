import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RadioButtonGroup, { RadioOption } from '../components/RadioButtonGroup'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useTheme, Theme } from '@/context/ThemeContext'

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const { theme, setTheme } = useTheme()
  console.log('theme screen theme', theme)
  const themeOptions: RadioOption[] = [
    { label: 'System Default', value: 'system' },
    { label: 'Light Mode', value: 'light' },
    { label: 'Dark Mode', value: 'dark' },
  ]

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
    >
      <RadioButtonGroup
        options={themeOptions}
        selectedValue={theme}
        onValueChange={value => setTheme(value as Theme)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})
