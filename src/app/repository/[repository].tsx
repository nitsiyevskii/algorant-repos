import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RepositoryDetails() {
  const { repository } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Repository Details</Text>
      <Text style={styles.id}>Repository: {repository}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  id: {
    fontSize: 14,
    color: '#666',
  },
});

