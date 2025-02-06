import { SafeAreaView, StyleSheet } from 'react-native'

import NewsFeedScreen from '@/components/NewsFeedScreen'
import { Text, View } from '@/components/Themed'

export default function Index() {
  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <NewsFeedScreen />
    </View>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  title: { marginTop: 15, fontSize: 20, fontWeight: 'bold' },
  separator: { marginVertical: 30, height: 1, width: '80%' },
})
