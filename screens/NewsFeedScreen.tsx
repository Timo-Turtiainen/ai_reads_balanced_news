import React, { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import axios from 'axios'
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { Article } from '@/constants/types'
import { Text } from '../components/Themed'
import NewsCard from '@/components/NewsCard'

export default function NewsFeedScreen() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = process.env.EXPO_PUBLIC_API_URL
  const apiKey = process.env.EXPO_PUBLIC_API_KEY

  const baseURL = `${baseUrl}top-headlines?country=us&apiKey=${apiKey}`

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

  useFocusEffect(
    useCallback(() => {
      fetchNews()
    }, [])
  )

  async function onRefresh() {
    try {
      setRefreshing(true)
      await fetchNews()
    } catch (err) {
      setError('Failed to load news')
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) return <ActivityIndicator style={styles.loader} size='large' color='#1a1b1b' />
  if (error) return <Text style={styles.errorText}>{error}</Text>

  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.url}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => <NewsCard article={item} />}
    />
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 },
})
