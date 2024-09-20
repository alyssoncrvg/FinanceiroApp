import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { PieChart  } from 'react-native-chart-kit';

import { styleInvestment } from '../styles/styleInvestment';
import { useFechDataInvestments, useModalInvestmentsHandle } from '../logics/investmentsScreenLogics';
import { FlexModalInvestments } from '../modal/modalInvestment';
import { useInvestments } from '../context/investmentContext';

export function InvestmentsScreen({ navigation }: any) {
    const [modalVisible, setInvestmentsModalVisible] = useState(false);
    const [investimentAdded, setInvestmentAdded] = useState(false);

    const { sumInvestments } = useInvestments();

    const { investmentsData } = useFechDataInvestments(investimentAdded);
    const { addModalInvestment, closeModalInvestment, handleInvestments } = useModalInvestmentsHandle(
        setInvestmentsModalVisible, setInvestmentAdded
    )

    const simulateInvestment = () => {
        Alert.alert('Simulação', 'Simulação de investimento realizada.');
    };

    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [simpleInterest, setSimpleInterest] = useState('');
    const [compoundInterest, setCompoundInterest] = useState('');

    const calculateInterests = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(time);

        if (isNaN(p) || isNaN(r) || isNaN(t)) {
            // Checa se algum dos valores não é um número
            return;
        }

        // Calcula juros simples
        const simpleInterestValue = (p * r * t).toFixed(2);

        // Calcula juros compostos
        const compoundInterestValue = (p * Math.pow(1 + r, t) - p).toFixed(2);

        // Atualiza o estado com os valores calculados
        setSimpleInterest(simpleInterestValue);
        setCompoundInterest(compoundInterestValue);
    }

    return (
        <ScrollView style={styleInvestment.scrollContent}>
            <View style={styleInvestment.container}>
                <Text style={styleInvestment.title}>Investimentos</Text>

                {/* Simulador de Investimentos */}
                <View style={styleInvestment.simulatorContainer}>
                    <Text style={styleInvestment.sectionTitle}>Simulador de Investimentos</Text>

                    <View style={styleInvestment.row}>
                        <Text style={styleInvestment.label}>Valor (R$)</Text>
                        <TextInput
                            style={styleInvestment.input}
                            value={principal}
                            keyboardType="numeric"
                            onChangeText={setPrincipal}
                        />
                    </View>

                    <View style={styleInvestment.row}>
                        <Text style={styleInvestment.label}>Taxa de Juros (%)</Text>
                        <TextInput
                            style={styleInvestment.input}
                            value={rate}
                            keyboardType="numeric"
                            onChangeText={setRate}
                        />
                    </View>

                    <View style={styleInvestment.row}>
                        <Text style={styleInvestment.label}>Tempo (anos)</Text>
                        <TextInput
                            style={styleInvestment.input}
                            value={time}
                            keyboardType="numeric"
                            onChangeText={setTime}
                        />
                    </View>

                    <TouchableOpacity style={styleInvestment.newInvestmentButton} onPress={calculateInterests}>
                        <Text style={styleInvestment.calculateButtonText}>Calcular</Text>
                    </TouchableOpacity>

                    {simpleInterest !== '' && compoundInterest !== '' && (
                        <View style={styleInvestment.resultsContainer}>
                            <Text style={styleInvestment.result}>Juros Simples: R$ {simpleInterest}</Text>
                            <Text style={styleInvestment.result}>Juros Compostos: R$ {compoundInterest}</Text>
                        </View>
                    )}
                </View>

                  {/* Carteira de Investimentos */}
                <View style={styleInvestment.portfolioContainer}>
                    <Text style={styleInvestment.sectionTitle}>Carteira de Investimento</Text>
                    <Text style={styleInvestment.totalText}>Total: {sumInvestments}</Text>
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