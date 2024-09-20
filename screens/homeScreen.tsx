import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

import { styleHome } from '../styles/styleHome'
import { styleNavigation } from '../styles/styleNavigation';

export function HomeScreen({ navigation }: any) {
  const data = [
    { name: 'Escola', population: 30, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Fatura', population: 20, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Lazer', population: 10, color: '#FFC107', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Streams', population: 25, color: '#3F51B5', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Mercado', population: 15, color: '#FF9800', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <ScrollView style={styleHome.scrollContent}>
      <View style={styleHome.container}>
        {/* Cabeçalho */}
        <View style={styleHome.header}>
          <Text style={styleHome.welcomeText}>Bem Vindo (usuário)</Text>
          <Text style={styleHome.balanceText}>R$ 7091.60</Text>
          <Text style={styleHome.subText}>Saldo atual em contas</Text>
        </View>

        {/* Resumo Mensal */}
        <View style={styleHome.summaryContainer}>
          <Text style={styleHome.sectionTitle}>Resumo Mensal</Text>
          <View style={styleHome.summaryContent}>
            <TouchableOpacity style={styleHome.summaryItem}>
              <Ionicons name="arrow-up-circle" size={32} color="green" />
              <Text style={styleHome.summaryText}>R$ 0.00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleHome.summaryItem}>
              <Ionicons name="arrow-down-circle" size={32} color="red" />
              <Text style={styleHome.summaryText}>R$ 0.00</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contas */}
        <View style={styleHome.accountsContainer}>
          <Text style={styleHome.sectionTitle}>Contas</Text>
          <View style={styleHome.accountItem}>
            <Ionicons name="briefcase" size={32} color="black" />
            <Text style={styleHome.accountText}>Carteira de investimentos</Text>
            <Text style={styleHome.accountBalance}>R$ 2154.78</Text>
          </View>
          <View style={styleHome.accountItem}>
            <Ionicons name="logo-usd" size={32} color="#5D3FD3" />
            <Text style={styleHome.accountText}>Nubank</Text>
            <Text style={styleHome.accountBalance}>R$ 3765.87</Text>
          </View>
          <View style={styleHome.accountItem}>
            <Ionicons name="logo-usd" size={32} color="green" />
            <Text style={styleHome.accountText}>Banco do Brasil</Text>
            <Text style={styleHome.accountBalance}>R$ 1170.95</Text>
          </View>
        </View>

        {/* Despesas */}
        <View style={styleHome.expensesContainer}>
          <Text style={styleHome.sectionTitle}>Despesas</Text>
          <PieChart
            data={data}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
    </ScrollView>
  );
}