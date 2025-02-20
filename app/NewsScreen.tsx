import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { Text, View } from '@/components/Themed'

export default function NewsScreen() {
  const { article } = useLocalSearchParams()

  if (!article || typeof article !== 'string') {
    return <Text style={styles.errorText}>No article found</Text>
  }

  // Parse JSON safely
  let parsedArticle
  try {
    parsedArticle = JSON.parse(article)
  } catch (error) {
    return <Text style={styles.errorText}>Failed to load article</Text>
  }

  return (
    <ScrollView style={styles.container}>
      {parsedArticle.urlToImage && (
        <Image source={{ uri: parsedArticle.urlToImage }} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.source}>{parsedArticle.source.name}</Text>
        <Text style={styles.title}>{parsedArticle.title}</Text>
        {/* <Text style={styles.content}>{parsedArticle.description || 'No description available.'}</Text> */}
        <Text style={styles.content}>{parsedArticle.content}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e' },
  image: { width: '100%', height: 250, borderRadius: 8, marginBottom: 10 },
  textContainer: { paddingHorizontal: 15 },
  source: { fontSize: 16, color: '#888', marginBottom: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  content: { fontSize: 16, color: '#ccc' },
  errorText: { color: 'red', fontSize: 18, textAlign: 'center', marginTop: 50 },
})
