import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export type RadioOption = {
  label: string
  value: string
}

interface RadioButtonGroupProps {
  options: RadioOption[]
  selectedValue: string
  onValueChange: (value: string) => void
}

export default function RadioButtonGroup({
  options,
  selectedValue,
  onValueChange,
}: RadioButtonGroupProps) {
  console.log('btn group ', selectedValue)
  return (
    <View>
      {options.map(option => (
        <Pressable
          key={option.value}
          style={styles.radioContainer}
          onPress={() => onValueChange(option.value)}
        >
          <View
            style={[styles.radioCircle, selectedValue === option.value && styles.selectedCircle]}
          />
          <Text style={styles.label}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    backgroundColor: '#0ed6e8',
    borderColor: '#0ed6e8',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
})
