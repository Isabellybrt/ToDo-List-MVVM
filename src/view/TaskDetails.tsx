import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { useTaskDetailsViewModel } from "../viewmodel/TaskDetailsViewModel";

type RoutesProp = RouteProp<RootStackParamList, "Details">;

const TaskDetails = () => {
  const { task, onDelete } = useRoute<RoutesProp>().params;

  const { deleteTask } = useTaskDetailsViewModel(task, onDelete);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteTask}>
        <Text style={styles.deleteText}>Excluir tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

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
});

export default TaskDetails;
