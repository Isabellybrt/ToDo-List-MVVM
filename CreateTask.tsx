import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Task } from "./App";

type TaskNavProp = NativeStackNavigationProp<RootStackParamList, "Task">;
type TaskRouteProp = RouteProp<RootStackParamList, "Task">;

const CreateTask = () => {
  const navigation = useNavigation<TaskNavProp>();
  const route = useRoute<TaskRouteProp>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Aviso", "Preencha título e descrição!");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      done: false,
    };

    route.params?.onSave?.(newTask);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.title}>Nova Tarefa</Text>

      <TextInput 
        placeholder="Título" 
        value={title} 
        onChangeText={setTitle} 
        style={styles.input} 
      />

      <TextInput 
        placeholder="Descrição" 
        value={description} 
        onChangeText={setDescription} 
        style={[styles.input, { height: 100 }]} multiline 
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleAddTask}>
        <Text style={styles.saveText}>Salvar Tarefa</Text>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F2F2F2", 
    padding: 20 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 20 
  },
  input: { 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 15, 
    fontSize: 16, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: "#ddd" 
  },
  saveButton: { 
    backgroundColor: "#007AFF", 
    padding: 15, 
    borderRadius: 25,
    alignItems: "center", 
    marginTop: 10 
  },
  saveText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});

export default CreateTask;
