import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen'
import CreateTask from './CreateTask'
import TaskDetails from './TaskDetails'

export type Task = {
  id: number
  title: string
  description: string
  done: boolean
}

export type RootStackParamList = {
  Home: undefined
  Task: { onSave?: (task: Task) => void } | undefined
  Details: { task: Task; onDelete: (id: number) => void }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Minhas Tarefas' }} 
        />
        <Stack.Screen 
          name="Task" 
          component={CreateTask} 
          options={{ title: 'Criar Tarefa' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={TaskDetails} 
          options={{ title: 'Detalhes' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
