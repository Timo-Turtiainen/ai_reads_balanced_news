import { Pressable, Image, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { Text, View } from '@/components/Themed'
import { Article } from '@/constants/types'
import { Dimensions } from 'react-native'

interface NewsCardProps {
  article: Article
}

const screenWidth = Dimensions.get('window').width

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={{
        pathname: '/NewsScreen',
        params: { article: JSON.stringify(article) },
      }}
      asChild
    >
      <Pressable>
        <View style={styles.card}>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.image} />
          )}
          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{article.source.name}</Text>
            <Text style={styles.author}>{article.author}</Text>
          </View>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth,
    backgroundColor: '#2b2a2a',
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
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
