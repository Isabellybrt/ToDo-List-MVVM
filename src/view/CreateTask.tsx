import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCreateTaskViewModel } from "../viewmodel/CreateTaskViewModel";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Task">;
type RoutesProp = RouteProp<RootStackParamList, "Task">;

const CreateTask = () => {
  const route = useRoute<RoutesProp>();
  const navigation = useNavigation<NavigationProp>();

  const { title, description, setTitle, setDescription, submit } =
    useCreateTaskViewModel((task) => {
      route.params?.onSave?.(task);
      navigation.goBack();
    });

  return (
    <View style={styles.container}>
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
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          if (!title.trim() || !description.trim()) {
            Alert.alert("Aviso", "Preencha título e descrição!");
            return;
          }
          submit();
        }}
      >
        <Text style={styles.saveText}>Salvar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

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
