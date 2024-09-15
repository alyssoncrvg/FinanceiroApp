import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { styleNavigation } from '../styles/styleNavigation';
import { styleControl } from '../styles/styleControl';
import { FlexModal } from '../modal/modalWallet';
import { addWallet } from '../functions/POST/caretira';
import { addExpenses } from '../functions/POST/despesas';
import { apiRequest } from '../api/api';
import Card from '../modal/cards/card';
import Carousel from 'react-native-snap-carousel';

type Item = {
    title: string;
    description: string;
    imageUrl: string;
};

export function ExpensesScreen({ navigation }: any) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado para controlar se uma nova despesa foi adicionada
    const [expenseAdded, setExpenseAdded] = useState(false);

    // Função para buscar os dados da API e formatá-los para o gráfico
    const fetchData = async () => {
        try {
            const gastos = await apiRequest('/get/gastos');
            const formattedData = gastos.map((gasto: any) => ({
                name: gasto.categoria,
                population: gasto.valor,
                color: getRandomColor(),
                legendFontColor: '#7F7F7F',
                legendFontSize: 12,
            }));

            setData(formattedData);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar os dados de gastos:', error);
            setLoading(false);
        }
    };

    // Função para gerar cor aleatória
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // UseEffect para buscar os dados da API quando o componente monta ou quando uma nova despesa é adicionada
    useEffect(() => {
        fetchData();
    }, [expenseAdded]);  // O gráfico será recarregado sempre que 'expenseAdded' mudar

    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const [expenseModalVisible, setExpenseModalVisible] = useState(false);

    const addModalWallet = () => {
        setWalletModalVisible(true);
    };

    const closeModalWallet = () => {
        setWalletModalVisible(false);
    };

    const addModalExpense = () => {
        setExpenseModalVisible(true);
    };

    const closeModalExpense = () => {
        setExpenseModalVisible(false);
    };

    const handleAddCarteira = (formData: { [key: string]: string | number }) => {
        const banco = String(formData.banco);
        const saldo = Number(formData.saldo);

        if (isNaN(saldo)) {
            console.error('Erro: O saldo informado não é um número válido');
            return;
        }
        addWallet(banco, saldo);
    };

    // Função para adicionar despesa e atualizar o gráfico
    const handleAddDespesas = async (formData: { [key: string]: string | number }) => {
        const descricao = String(formData.descricao);
        const valor = Number(formData.valor);
        const categoria = String(formData.categoria);

        await addExpenses(descricao, valor, categoria);

        // Após adicionar uma despesa, altere o estado para recarregar o gráfico
        setExpenseAdded(prev => !prev);
        closeModalExpense(); // Fecha o modal após adicionar a despesa
    };

    if (loading) {
        return (
            <View style={styleControl.container}>
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    const data2: Item[] = [
        {
            title: 'Meu Primeiro Card',
            description: 'Essa é uma descrição de exemplo para o card.',
            imageUrl: 'https://via.placeholder.com/400',
        },
        {
            title: 'Segundo Card',
            description: 'Este é um segundo exemplo de card com imagem diferente.',
            imageUrl: 'https://via.placeholder.com/400',
        },
        {
            title: 'Terceiro Card',
            description: 'Mais um card para o carrossel.',
            imageUrl: 'https://via.placeholder.com/400',
        },
    ];

    const renderItem = ({ item }: { item: Item }) => (
        <Card title={item.title} description={item.description} imageUrl={item.imageUrl} />
      );
    
    const { width } = Dimensions.get('window');

    return (
        <View style={styleControl.container}>
            <ScrollView style={styleControl.scrollView}>
                <View style={styleControl.walletsContainer}>
                    <Text style={styleControl.sectionTitle}>Controle de Gastos</Text>
                    {/* <SafeAreaView style={styles.container}>
                        <Carousel
                            data={data2}
                            renderItem={renderItem}
                            sliderWidth={width}
                            itemWidth={width * 0.75} // Ajuste o tamanho do card em relação ao slider
                            loop={true} // Faz o carrossel dar loop
                            autoplay={true} // Auto deslize
                            autoplayDelay={500} // Delay para começar o autoplay
                            autoplayInterval={3000} // Tempo entre cada slide
                        />
                    </SafeAreaView> */}
                    <TouchableOpacity style={styleControl.addButton} onPress={addModalWallet}>
                        <Text style={styleControl.addButtonText}>Adicionar +</Text>
                    </TouchableOpacity>
                </View>

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
                    <TouchableOpacity style={styleControl.addButton} onPress={addModalExpense}>
                        <Text style={styleControl.addButtonText}>Adicionar +</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <FlexModal
                modalVisible={walletModalVisible}
                onClose={closeModalWallet}
                fields={[
                    { name: 'banco', placeholder: 'Nome do banco' },
                    { name: 'saldo', placeholder: 'Saldo inicial', type: 'numeric' }
                ]}
                onSubmit={handleAddCarteira}
            />

            <FlexModal
                modalVisible={expenseModalVisible}
                onClose={closeModalExpense}
                fields={[
                    { name: 'descricao', placeholder: 'Descrição' },
                    { name: 'valor', placeholder: '0.00', type: 'numeric' },
                    { name: 'categoria', placeholder: 'Categoria' }
                ]}
                onSubmit={handleAddDespesas}
            />

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });