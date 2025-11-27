import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useHomeViewModel } from "../viewmodel/HomeViewModel";

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { tasks, addTask, toggleDone, deleteTask } = useHomeViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma tarefa adicionada ainda</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(t) => t.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.taskCard, item.done && styles.taskDone]}>
              <TouchableOpacity
                style={[styles.checkbox, item.done && styles.checkboxChecked]}
                onPress={() => toggleDone(item.id)}
              >
                {item.done && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.textContainer}
                onPress={() =>
                  navigation.navigate("Details", {
                    task: item,
                    onDelete: deleteTask,
                  })
                }
              >
                <Text style={[styles.taskTitle, item.done && styles.taskTitleDone]}>
                  {item.title}
                </Text>
                <Text style={[styles.taskDescription, item.done && styles.taskDescDone]} numberOfLines={1}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("Task", {
            onSave: addTask,
          })
        }
      >
        <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F2F2F2', 
    padding: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 15 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#888', 
    marginTop: 30 
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: { 
    flex: 1 
  },
  taskTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#007AFF' 
  },
  taskTitleDone: { 
    color: '#4F8A10', 
    textDecorationLine: 'line-through' 
  },
  taskDescription: { 
    color: '#555', 
    marginTop: 5 
  },
  taskDescDone: { 
    color: '#4F8A10', 
    textDecorationLine: 'line-through' 
  },
  taskDone: { 
    backgroundColor: '#EAF5FF' 
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

export default HomeScreen;
