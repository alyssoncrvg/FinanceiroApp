import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { styleControl } from '../styles/styleControl'; 
import { FlexModal } from '../modal/modalWallet';
import { useFetchData, useModalHandlers } from '../logics/controleScreenLogics';
import Card from '../modal/cards/card';
// import Carousel from 'react-native-reanimated-carousel';
import { EditWalletModal } from '../modal/modalEditWallet';
import { Item } from '../interfaces/interfaces';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { expenses } from '../interfaces/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type RootStackParamList = {
    ExpensesScreen: undefined;
    ExpenseDetails: { data: expenses[] };
  };

type ExpensesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpensesScreen'>;


export function ExpensesScreen() {

    const navigation = useNavigation<ExpensesScreenNavigationProp>();


    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const [expenseModalVisible, setExpenseModalVisible] = useState(false);

    const [activeSlide, setActiveSlide] = useState(0); // Variável para rastrear o slide ativo

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const [refreshData, setRefreshData] = useState(false); 

    const [addItem, setAddItem] = useState(false);

    const { dataWallet, dataExpenses, dataExpensesPiechart, loading } = useFetchData( refreshData || addItem); // Passa `expenseAdded` para o hook
    const { addModalWallet, closeModalWallet, addModalExpense, closeModalExpense, handleAddCarteira, handleAddDespesas } = useModalHandlers(
        setWalletModalVisible,
        setExpenseModalVisible,
    );

    useFocusEffect(
        useCallback(() => {
          setRefreshData(true); // Disparar recarregamento ao focar
        }, [])
      );
    
      // Depois que os dados forem carregados, podemos resetar o refreshData
      useEffect(() => {
        if ( refreshData) {
          setRefreshData(false); // Impede a recarga contínua quando os dados já foram atualizados
        }
      }, [ refreshData]);

      useEffect( () => {
        if(addItem){
            setAddItem(false)
        }
      }, [addItem])

    const firstSlide = 1;

    const isDataEmpty = dataExpensesPiechart.length === 0;
    const isDataWalleteEmpty = dataWallet.length === 0;

    const walletDefault = [{
        id: '',
        banco: 'Nenhum Banco Cadastrado',
        valor: 0,
    }];

    const carouselRef = useRef(null);

    function handlePress(item: Item) {
        console.log(item)
        setSelectedItem(item); // Define o item selecionado
        setEditModalVisible(true); // Abre o modal
    }

    const handleEditSubmit = (formData: { [key: string]: string | number }) => {
        // Lógica para editar o item
        console.log('Dados do formulário:', formData);
        setEditModalVisible(false);
    };

    const handlePieChartPress = () => {
        navigation.navigate('ExpenseDetails', { data: dataExpenses }); // Navegar para a tela ExpenseDetails
      };

    const renderItem = ({ item }: { item: Item }) => (

        <View style={styleControl.containerCarousel}>
            {isDataWalleteEmpty ? (
                <Card banco={item.banco} valor={item.valor} />
            ) : (

                <TouchableOpacity onPress={() => handlePress(item)}>
                    <Card banco={item.banco} valor={item.valor} />
                </TouchableOpacity>
            )}
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
        <ScrollView style={styleControl.scrollView}>
            <View style={styleControl.container}>
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
                    {/* <Carousel
                        ref={carouselRef}
                        width={width * 0.9} // Largura dos itens do Carousel
                        data={isDataWalleteEmpty ? walletDefault : dataWallet}
                        renderItem={({ item }) => renderItem({ item })} // Renderiza os itens
                        onSnapToItem={(index) => setActiveSlide(index)} // Atualiza o slide ativo
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 50,
                        }}
                        panGestureHandlerProps={{
                            activeOffsetX: [-10, 10], // Controle sensibilidade do swipe
                        }}
                        loop={false}
                    /> */}

                    {/* <Pagination
                        dotsLength={isDataWalleteEmpty ? walletDefault.length : dataWallet.length}
                        activeDotIndex={activeSlide}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'rgba(0, 0, 0, 0.92)',
                        }}
                        inactiveDotStyle={{
                            backgroundColor: '#C0C0C0',
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={!!carouselRef.current}
                    /> */}

                </View>

                <View style={styleControl.expensesContainer}>
                    <View style={styleControl.walletsContent}>
                        <Text style={styleControl.sectionTitle}>Despesas</Text>
                        <TouchableOpacity style={styleControl.addButton} onPress={addModalExpense}>
                            <Text style={styleControl.addButtonText}>Adicionar +</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handlePieChartPress}>
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
                                data={dataExpensesPiechart}
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


                <FlexModal
                    modalVisible={walletModalVisible}
                    onClose={closeModalWallet}
                    fields={[
                        { name: 'banco', placeholder: 'Nome do banco' },
                        { name: 'saldo', placeholder: 'Saldo inicial', type: 'numeric' }
                    ]}
                    onSubmit={handleAddCarteira}
                    setAddItem={setAddItem}
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
                    setAddItem={setAddItem}
                />

                {selectedItem && (
                    <EditWalletModal
                        modalVisible={editModalVisible}
                        onClose={() => {
                            setEditModalVisible(false)
                        }}
                        fields={[
                            { name: 'banco', placeholder: 'Nome do banco' },
                            { name: 'valor', placeholder: 'Saldo', type: 'numeric' },
                        ]}
                        onSubmit={handleEditSubmit}
                        item={selectedItem}
                    />
                )}
            </View>
        </ScrollView>
    )
}