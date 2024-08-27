import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from './screens/homeScreen';
import { InvestmentsScreen } from './screens/InvestmentsScreen';
import { ExpensesScreen } from './screens/controle';
import { GoalsScreen } from './screens/goals';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarLabelStyle: { display: 'none' }, // Oculta o rótulo da aba
            tabBarStyle: { backgroundColor: 'transparent' }, // Define a cor de fundo da barra de abas como transparente
            tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // Remove o indicador da aba
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Investments" component={InvestmentsScreen} />
          <Tab.Screen name="Control" component={ExpensesScreen} />
          <Tab.Screen name="Goals" component={GoalsScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'white', // Defina a cor de fundo conforme necessário
  },
});
