import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SafeAreaView, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native'

import { Text, View } from './Themed'

interface Article {
  source: { id: string | null; name: string }
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export default function NewsScreen() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.EXPO_PUBLIC_API_URL
  const apiKey = process.env.EXPO_PUBLIC_API_KEY

  const baseURL = `${baseUrl}top-headlines?country=us&apiKey=${apiKey}`

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(baseURL)
        setArticles(data.articles)
      } catch (err) {
        setError('Failed to load news')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) return <ActivityIndicator style={styles.loader} size='large' color='#1a1b1b' />
  if (error) return <Text style={styles.errorText}>{error}</Text>

  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.url}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
          <Text style={styles.source}>{item.source.name}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
  card: {
    backgroundColor: '#2b2a2a',
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  source: { paddingLeft: 15, fontSize: 15, color: '#fff', marginTop: 5 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  title: { paddingLeft: 15, fontSize: 18, color: '#fff', fontWeight: 'bold', marginTop: 10 },
  description: { paddingLeft: 15, paddingBottom: 15, fontSize: 14, color: '#fff', marginTop: 5 },
})
