import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

import { styleHome } from '../styles/styleHome';
import { useFetchData } from '../logics/controleScreenLogics';
import { useInvestments } from '../context/investmentContext';
import { useFocusEffect } from '@react-navigation/native';
import { useFechDataInvestments } from '../logics/investmentsScreenLogics';
import { getMoviment } from '../functions/GET/movimentacoes';

export function HomeScreen({ navigation }: any) {
  const [refreshData, setRefreshData] = useState(false); 
  const [monthlyMovements, setMonthlyMovements] = useState<{ entradas: number; saidas: number }>({ entradas: 0, saidas: 0 });
  const [currentMonthYear, setCurrentMonthYear] = useState<string>('09-2024');
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  const { sumWallet, dataExpensesOthers, topWallets } = useFetchData(refreshData);
  const { sumInvestments } = useInvestments();

  useFechDataInvestments(refreshData);

  const isDataEmpty = dataExpensesOthers.length === 0;

  useFocusEffect(
    useCallback(() => {
      setRefreshData(true); // Disparar recarregamento ao focar
    }, [])
  );

  // Quando os dados forem carregados, podemos resetar o refreshData e mudar o estado de carregamento
  useEffect(() => {
    if (refreshData) {
      setRefreshData(false); // Impede a recarga contínua quando os dados já foram atualizados

      getMoviment(currentMonthYear).then((data) => {
        setMonthlyMovements(data);
        setIsLoading(false); // Dados carregados, parar o carregamento
      });
    }
  }, [refreshData, currentMonthYear]);

  // Mostrar o loader enquanto os dados estão carregando
  if (isLoading) {
    return (
      <View style={styleHome.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styleHome.scrollContent}>
      <View style={styleHome.container}>
        {/* Cabeçalho */}
        <View style={styleHome.header}>
          <Text style={styleHome.welcomeText}>Bem Vindo</Text>
          <Text style={styleHome.balanceText}>R$ {(sumWallet + sumInvestments).toFixed(2)}</Text>
          <Text style={styleHome.subText}>Saldo atual em contas</Text>
        </View>

        {/* Resumo Mensal */}
        <View style={styleHome.summaryContainer}>
          <Text style={styleHome.sectionTitle}>Resumo Mensal</Text>
          <View style={styleHome.summaryContent}>
            <TouchableOpacity style={styleHome.summaryItem}>
              <Ionicons name="arrow-down-circle" size={32} color="green" />
              <Text style={styleHome.summaryText}>R$ {monthlyMovements.entradas.toFixed(2)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleHome.summaryItem}>
              <Ionicons name="arrow-up-circle" size={32} color="red" />
              <Text style={styleHome.summaryText}>R$ {monthlyMovements.saidas.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contas */}
        <View style={styleHome.accountsContainer}>
          <Text style={styleHome.sectionTitle}>Contas</Text>
          <View style={styleHome.accountItem}>
            <Ionicons name="briefcase" size={32} color="black" />
            <Text style={styleHome.accountText}>Carteira de investimentos</Text>
            <Text style={styleHome.accountBalance}>R$ {sumInvestments.toFixed(2)}</Text>
          </View>
          {/* Exibir a primeira carteira apenas se ela existir */}
          {topWallets.length > 0 && (
            <View style={styleHome.accountItem}>
              <Ionicons name="wallet" size={32} color="black" />
              <Text style={styleHome.accountText}>{topWallets[0].banco}</Text>
              <Text style={styleHome.accountBalance}>R$ {topWallets[0].valor.toFixed(2)}</Text>
            </View>
          )}

          {/* Exibir a segunda carteira apenas se ela existir */}
          {topWallets.length > 1 && (
            <View style={styleHome.accountItem}>
              <Ionicons name="wallet" size={32} color="black" />
              <Text style={styleHome.accountText}>{topWallets[1].banco}</Text>
              <Text style={styleHome.accountBalance}>R$ {topWallets[1].valor.toFixed(2)}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Despesas */}
      <View style={styleHome.expensesContainer}>
        <Text style={styleHome.sectionTitle}>Despesas</Text>
        {isDataEmpty ? (
          <PieChart
            data={[{ name: 'Sem Dados', population: 1 }]} // Dado fictício para exibir o gráfico cinza
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => 'rgba(169, 169, 169, 1)', // Cinza
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <PieChart
            data={dataExpensesOthers}
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
        )}
      </View>
    </ScrollView>
  );
}
