import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from './screens/homeScreen';
import { InvestmentsScreen } from './screens/InvestmentsScreen';
import { GoalsScreen } from './screens/goals';
import { BottomNavigationBar } from './screens/bottomNavigationBar';
import { InvestmentProvider } from './context/investmentContext';
import ExpensesStackNavigator from './screens/stack/ExpensesStackScreen';
import { InvestmentsStack } from './screens/stack/investmentsStackScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    // <MenuProvider> {/* Adiciona o MenuProvider */}
      <InvestmentProvider>
          <NavigationContainer>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.container}>
                {/* Conteúdo das telas */}
                <Tab.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    swipeEnabled: false,
                    tabBarLabelStyle: { display: 'none' },
                    tabBarStyle: { backgroundColor: 'transparent' },
                    tabBarIndicatorStyle: { backgroundColor: 'transparent' },
                  }}
                >
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Investments" component={InvestmentsStack} />
                  <Tab.Screen name="Control" component={ExpensesStackNavigator} />
                  <Tab.Screen name="Goals" component={GoalsScreen} />
                </Tab.Navigator>

                {/* Barra de navegação fixa */}
                <BottomNavigationBar />
              </View>
            </SafeAreaView>
          </NavigationContainer>
      </InvestmentProvider>
    // </MenuProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between', // Garante que a barra fique no final da tela
  },
});
