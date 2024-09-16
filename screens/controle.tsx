import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { styleControl } from '../styles/styleControl'; // Atualize o caminho conforme necessário
import { FlexModal } from '../modal/modalWallet';
import { useFetchData, useModalHandlers } from '../logics/controleScreenLogics'; // Atualize o caminho conforme necessário
import Card from '../modal/cards/card';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { styleNavigation } from '../styles/styleNavigation';

interface Item {
    banco: string;
    valor: number;
}

export function ExpensesScreen({ navigation }: any) {
    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const [expenseModalVisible, setExpenseModalVisible] = useState(false);
    const [expenseAdded, setExpenseAdded] = useState(false); // Estado para acionar o re-fetch
    const [activeSlide, setActiveSlide] = useState(0); // Variável para rastrear o slide ativo

    const { dataWallet, dataExpenses, loading } = useFetchData(expenseAdded); // Passa `expenseAdded` para o hook
    const { addModalWallet, closeModalWallet, addModalExpense, closeModalExpense, handleAddCarteira, handleAddDespesas } = useModalHandlers(
        setWalletModalVisible,
        setExpenseModalVisible,
        setExpenseAdded // Passa o setter para o hook de manipulação de modais
    );

    const firstSlide = 1;

    const isDataEmpty = dataExpenses.length === 0;
    const isDataWalleteEmpty = dataWallet.length === 0;

    const walletDefault = [{
        banco: 'Nenhum Banco Cadastrado',
        valor: 0,
    }];

    var carouselRef = useRef<Carousel<any>>(null);

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styleControl.containerCarousel}>
            <Card banco={item.banco} valor={item.valor} />
        </View>
    );

    const { width } = Dimensions.get('window');

    if (loading) {
        return (
            <View style={styleControl.container}>
                <Text>Carregando dados...</Text>
            </View>
        );
    }


    return (
        <View style={styleControl.container}>
            <ScrollView style={styleControl.scrollView}>
                <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold', marginTop: 0 }}>
                    Controle de Gastos
                </Text>
                <View style={styleControl.walletsContainer}>
                    <View style={styleControl.walletsContent}>
                        <Text style={styleControl.sectionTitle}>Carteiras</Text>
                        <TouchableOpacity style={styleControl.addButton} onPress={addModalWallet}>
                            <Text style={styleControl.addButtonText}>Adicionar +</Text>
                        </TouchableOpacity>
                    </View>
                    {isDataWalleteEmpty ? (
                        <Carousel
                            ref={carouselRef}
                            layout={'default'}
                            layoutCardOffset={18}
                            data={walletDefault}
                            renderItem={renderItem}
                            sliderWidth={width}
                            itemWidth={width * 0.90}
                            firstItem={firstSlide}
                            containerCustomStyle={{ padding: 10 }}
                            contentContainerCustomStyle={{ marginVertical: 0 }}
                            slideStyle={{ backgroundColor: '#fff' }}
                            onSnapToItem={(index) => setActiveSlide(index)} // Atualiza o slide ativo
                            useScrollView={true}
                        />
                    ) : (
                        <Carousel
                        ref={carouselRef}
                        layout={'default'}
                        layoutCardOffset={18}
                        data={dataWallet}
                        renderItem={renderItem}
                        sliderWidth={width}
                        itemWidth={width * 0.90}
                        firstItem={firstSlide}
                        containerCustomStyle={{ padding: 10 }}
                        contentContainerCustomStyle={{ marginVertical: 0 }}
                        slideStyle={{ backgroundColor: '#fff' }}
                        onSnapToItem={(index) => setActiveSlide(index)} // Atualiza o slide ativo
                        useScrollView={true}
                    />
                    )}
                     <Pagination
                        dotsLength={dataWallet.length} // Usa o comprimento do array data2
                        activeDotIndex={activeSlide} // Usa o slide ativo do estado
                        containerStyle={styleControl.paginationContainer}
                        dotColor={'rgba(0, 0, 0, 0.92)'}
                        dotStyle={styleControl.paginationDot}
                        inactiveDotColor={'#C0C0C0'}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={carouselRef.current ? carouselRef.current : undefined} // Passa a referência ao Pagination
                        tappableDots={!!carouselRef.current} // Permite tocar nos dots
                    />

                </View>

                <View style={styleControl.expensesContainer}>
                    <View style={styleControl.walletsContent}>
                        <Text style={styleControl.sectionTitle}>Despesas</Text>
                        <TouchableOpacity style={styleControl.addButton} onPress={addModalExpense}>
                            <Text style={styleControl.addButtonText}>Adicionar +</Text>
                        </TouchableOpacity>
                    </View>
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
                            data={dataExpenses}
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
    )
}