import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

import { styleInvestment } from '../styles/styleInvestment'
import { FlexModal } from '../modal/modalWallet';
import { useFechDataInvestments, useModalInvestmentsHandle } from '../logics/investmentsScreenLogics';
import { FlexModalInvestments } from '../modal/modalInvestment';

export function InvestmentsScreen({ navigation }: any) {
    const [investmentValue, setInvestmentValue] = useState('1000.00');
    const [returnPrediction, setReturnPrediction] = useState('991.5');

    const [modalVisible, setInvestmentsModalVisible] = useState(false);
    const [investimentAdded, setInvestmentAdded] = useState(false);

    const { investmentsData } = useFechDataInvestments(investimentAdded);
    const { addModalInvestment, closeModalInvestment, handleInvestments } = useModalInvestmentsHandle(
        setInvestmentsModalVisible, setInvestmentAdded
    )

    const simulateInvestment = () => {
        Alert.alert('Simulação', 'Simulação de investimento realizada.');
    };

    return (
        <ScrollView style={styleInvestment.scrollContent}>
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
                        data={investmentsData}
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
                <TouchableOpacity style={styleInvestment.newInvestmentButton} onPress={addModalInvestment}>
                    <Text style={styleInvestment.newInvestmentButtonText}>Novo Investimento</Text>
                </TouchableOpacity>
            </View>

            <FlexModalInvestments
                    modalVisible={modalVisible}
                    onClose={closeModalInvestment}
                    onSubmit={handleInvestments}
                />
        </ScrollView>
    );
}