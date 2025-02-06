import React, { useState, useEffect } from 'react'
import { Link } from 'expo-router'
import axios from 'axios'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native'

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

export default function NewsFeedScreen() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.EXPO_PUBLIC_API_URL
  const apiKey = process.env.EXPO_PUBLIC_API_KEY

  const baseURL = `${baseUrl}everything?q=""trump&apiKey=${apiKey}`

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
        <Link
          href={{
            pathname: '/NewsScreen',
            params: { article: JSON.stringify(item) },
          }}
          asChild
        >
          <Pressable>
            <View style={styles.card}>
              {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
              <View style={styles.sourceContainer}>
                <Text style={styles.source}>{item.source.name}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </Pressable>
        </Link>
      )}
    />
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
  card: { backgroundColor: '#2b2a2a', marginVertical: 10, borderRadius: 8, elevation: 2 },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2b2a2a',
    paddingRight: 15,
  },
  source: {
    paddingLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
    justifyContent: 'flex-end',
  },
  author: {
    paddingLeft: 15,
    fontSize: 15,
    color: '#fff',
    marginTop: 5,
    justifyContent: 'flex-start',
  },
  image: { width: '100%', height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  title: { paddingLeft: 15, fontSize: 18, color: '#fff', fontWeight: 'bold', marginTop: 10 },
  description: { paddingLeft: 15, paddingBottom: 15, fontSize: 14, color: '#fff', marginTop: 5 },
})
