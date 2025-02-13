import React, { useState } from 'react'
import { StyleSheet, Alert, Image, Dimensions } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { View, Text } from '../components/Themed'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

interface LoginProps {
  onLoginSuccess: (credential: AppleAuthentication.AppleAuthenticationCredential) => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log('credential: ', credential)
      onLoginSuccess(credential)
    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        Alert.alert('Sign-in Canceled', 'You canceled the sign-in process.')
      } else {
        Alert.alert('Error', 'An error occurred during sign-in.')
        console.error(error)
      }
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Image source={require('../assets/images/news.jpeg')} style={styles.logo} />
        <View>
          <Text style={styles.text}>Welcome to</Text>
          <Text style={styles.text}>Big Dicks News</Text>
        </View>
      </View>
      <View style={styles.apple}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={5}
          style={styles.button}
          onPress={handleAppleSignIn}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  button: { width: 200, height: 44 },
  text: { fontSize: 36, marginBottom: 10 },
  logo: { width: screenWidth, height: screenHeight * 0.4 },
  apple: { alignItems: 'center' },
})
