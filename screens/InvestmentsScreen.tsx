import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

import { styleInvestment } from '../styles/styleInvestment'
import { styleHome } from '../styles/styleHome';
import { styleNavigation } from '../styles/styleNavigation';

export function InvestmentsScreen({ navigation }: any) {
    const [investmentValue, setInvestmentValue] = useState('1000.00');
    const [returnPrediction, setReturnPrediction] = useState('991.5');

    const data = [
        { name: 'FNA111', population: 15, color: '#FF6384', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'HAPV3', population: 25, color: '#36A2EB', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'BBDC4', population: 5, color: '#FFCE56', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'MGLU3', population: 10, color: '#FF9F40', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'VALE ON NM', population: 45, color: '#4BC0C0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const simulateInvestment = () => {
        Alert.alert('Simulação', 'Simulação de investimento realizada.');
    };

    return (
        <View style={styleInvestment.container}>
            <Text style={styleInvestment.title}>Investimentos</Text>

            {/* Simulador de Investimentos */}
            <View style={styleInvestment.simulatorContainer}>
                <Text style={styleInvestment.sectionTitle}>Simulador de Investimentos</Text>

                <View style={styleInvestment.row}>
                    <Text style={styleInvestment.label}>Ação</Text>
                    <View style={styleInvestment.actionSelector}>
                        <Text>VALE ON NM</Text>
                        <Ionicons name="chevron-down" size={24} color="black" />
                    </View>
                </View>

                <View style={styleInvestment.row}>
                    <Text style={styleInvestment.label}>Valor</Text>
                    <TextInput
                        style={styleInvestment.input}
                        value={investmentValue}
                        keyboardType="numeric"
                        onChangeText={setInvestmentValue}
                    />
                </View>

                <View style={styleInvestment.row}>
                    <Text style={styleInvestment.label}>Variação do dia</Text>
                    <Text style={styleInvestment.positiveVariation}>+0.74 1.2%</Text>
                </View>

                <View style={styleInvestment.row}>
                    <Text style={styleInvestment.label}>Variação do Mês</Text>
                    <Text style={styleInvestment.negativeVariation}>-0.65 -0.85%</Text>
                </View>

                <TouchableOpacity style={styleInvestment.simulateButton} onPress={simulateInvestment}>
                    <Text style={styleInvestment.simulateButtonText}>SIMULAR</Text>
                </TouchableOpacity>

                <Text style={styleInvestment.returnText}>
                    Há uma previsão de um retorno aproximado de <Text style={styleInvestment.returnValue}>R$ {returnPrediction}</Text>
                </Text>
            </View>

            {/* Carteira de Investimentos */}
            <View style={styleInvestment.portfolioContainer}>
                <Text style={styleInvestment.sectionTitle}>Carteira de Investimento</Text>
                <Text style={styleInvestment.totalText}>Total: 2154.78</Text>
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

            {/* Botão Novo Investimento */}
            <TouchableOpacity style={styleInvestment.newInvestmentButton}>
                <Text style={styleInvestment.newInvestmentButtonText}>Novo Investimento</Text>
            </TouchableOpacity>

            {/* Barra de Navegação */}
            <View style={styleNavigation.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={32} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons name="stats-chart" size={32} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Control')}>
                    <Ionicons name="pie-chart" size={32} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
                    <Ionicons name="cash" size={32} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}