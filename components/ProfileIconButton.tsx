import React, { forwardRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ProfileIconButtonProps {
  firstLetter: string
  color: string
  onPress?: () => void
}

// Use forwardRef to avoid ref-related errors
const ProfileIconButton = forwardRef<View, ProfileIconButtonProps>(
  ({ firstLetter, color, onPress }, ref) => {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
        <View ref={ref} style={[styles.icon, { backgroundColor: color }]}>
          <Text style={styles.text}>{firstLetter}</Text>
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
})

export default ProfileIconButton
