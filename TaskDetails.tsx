import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

const TaskDetails: React.FC<Props> = ({ route }) => {
  const { task, onDelete } = route.params

  const handleDelete = () => {
    onDelete(task.id)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Excluir tarefa</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default TaskDetails