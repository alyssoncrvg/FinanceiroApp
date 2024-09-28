import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { styleInvestment } from '../styles/styleInvestment';
import { useFechDataInvestments, useModalInvestmentsHandle } from '../logics/investmentsScreenLogics';
import { FlexModalInvestments } from '../modal/modalInvestment';
import { useInvestments } from '../context/investmentContext';
import { FormDataInvestments } from '../interfaces/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    InvestmentScreen: undefined;
    InvestmentDetails: { data: FormDataInvestments[] };
};

type ExpensesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InvestmentScreen'>;

export function InvestmentsScreen() {
    const navigation = useNavigation<ExpensesScreenNavigationProp>();

    const [modalVisible, setInvestmentsModalVisible] = useState(false);
    const [investimentAdded, setInvestmentAdded] = useState(false);
    const [loading, setLoading] = useState(true); 
    const { sumInvestments } = useInvestments();
    const [refreshData, setRefreshData] = useState(false); 

    const { investmentsDataFormated, investmentData } = useFechDataInvestments(investimentAdded || refreshData);

    const { addModalInvestment, closeModalInvestment, handleInvestments } = useModalInvestmentsHandle(
        setInvestmentsModalVisible, setInvestmentAdded
    );

    useFocusEffect(
        useCallback(() => {
            setRefreshData(true); 
        }, [])
    );

    useEffect(() => {
        if (refreshData) {
            setLoading(true);
            setRefreshData(false); 
        }
    }, [refreshData]);

    useEffect(() => {
        if (investimentAdded) {
            setInvestmentAdded(false);
            setRefreshData(true);
        }
    }, [investimentAdded]);

    useEffect(() => {
        if (investmentsDataFormated.length > 0 || !refreshData) {
            setLoading(false);
        }
    }, [investmentsDataFormated, refreshData]);

    const isDataEmpty = investmentsDataFormated.length === 0;

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
            return;
        }

        const simpleInterestValue = (p * r * t).toFixed(2);
        const compoundInterestValue = (p * Math.pow(1 + r, t) - p).toFixed(2);

        setSimpleInterest(simpleInterestValue);
        setCompoundInterest(compoundInterestValue);
    };

    const handlePieChartPress = () => {
        navigation.navigate('InvestmentDetails', { data: investmentData });
    };

    
    if (loading) {
        return (
            <View style={styleInvestment.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styleInvestment.scrollContent}>
            <View style={styleInvestment.container}>
                <Text style={styleInvestment.title}>Investimentos</Text>

                {/* Simulador de Investimentos */}
                <View style={styleInvestment.simulatorContainer}>
                    <Text style={styleInvestment.sectionTitle}>Calculadora de Juros</Text>

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
                    <TouchableOpacity onPress={handlePieChartPress}>
                        {isDataEmpty ? (
                            <PieChart
                                data={[{ name: 'Sem Dados', population: 1 }]}
                                width={350}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#fff',
                                    backgroundGradientFrom: '#fff',
                                    backgroundGradientTo: '#fff',
                                    color: () => 'rgba(169, 169, 169, 1)',
                                }}
                                accessor="population"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute
                            />
                        ) : (
                            <PieChart
                                data={investmentsDataFormated}
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
                    </TouchableOpacity>
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
