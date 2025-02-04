import { StyleSheet } from 'react-native'

import NewsScreen from '@/components/NewsScreen'
import { Text, View } from '@/components/Themed'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <NewsScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  title: { marginTop: 15, fontSize: 20, fontWeight: 'bold' },
  separator: { marginVertical: 30, height: 1, width: '80%' },
})
