import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { styleNavigation } from '../styles/styleNavigation';
import { styleControl } from '../styles/styleControl';

export function ExpensesScreen({ navigation }: any) {
    const data = [
        { name: 'ESCOLA', population: 15, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 12 },
        { name: 'FATURA DO CARTÃO', population: 25, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 12 },
        { name: 'LAZER', population: 5, color: '#FFC107', legendFontColor: '#7F7F7F', legendFontSize: 12 },
        { name: 'STREAMS', population: 10, color: '#3F51B5', legendFontColor: '#7F7F7F', legendFontSize: 12 },
        { name: 'MERCADO', population: 45, color: '#FF9800', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    ];

    return (
        <View style={styleControl.container}>
        <ScrollView style={styleControl.scrollView}>
            {/* Cabeçalho */}
            <View style={styleControl.header}>
                <Text style={styleControl.title}>Controle de Gastos</Text>
            </View>

            {/* Carteiras */}
            <View style={styleControl.walletsContainer}>
                <Text style={styleControl.sectionTitle}>Carteiras</Text>
                <View style={styleControl.walletsContent}>
                    <View style={styleControl.walletItem}>
                        <Text style={styleControl.walletName}>Nubank</Text>
                        <Text style={styleControl.walletBalance}>R$ 3765.87</Text>
                    </View>
                    <TouchableOpacity style={styleControl.addButton}>
                        <Text style={styleControl.addButtonText}>Adicionar +</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Despesas */}
            <View style={styleControl.expensesContainer}>
                <Text style={styleControl.sectionTitle}>Despesas</Text>
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
                <TouchableOpacity style={styleControl.addButton}>
                    <Text style={styleControl.addButtonText}>Adicionar +</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

        {/* Barra de Navegação */}
        <View style={styleNavigation.navigationBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home" size={32} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Investments')}>
                <Ionicons name="stats-chart" size={32} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Control')}>
                <Ionicons name="pie-chart" size={32} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
                <Ionicons name="cash" size={32} color="#000" />
            </TouchableOpacity>
        </View>
    </View>
    );
}