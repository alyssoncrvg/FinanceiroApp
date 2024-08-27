import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from './screens/homeScreen';
import { DetailsScreen } from './screens/details';
import { InvestmentsScreen } from './screens/InvestmentsScreen';

// Defina os tipos de parâmetros que cada tela aceita
type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Investments: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Investments" component={InvestmentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}