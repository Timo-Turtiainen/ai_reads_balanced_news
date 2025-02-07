import { StyleSheet } from 'react-native'

import NewsFeedScreen from '@/screens/NewsFeedScreen'
import { View } from '@/components/Themed'

export default function Index() {
  return (
    <View style={styles.container}>
      <NewsFeedScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  title: { marginTop: 15, fontSize: 20, fontWeight: 'bold' },
  separator: { marginVertical: 30, height: 1, width: '80%' },
})
