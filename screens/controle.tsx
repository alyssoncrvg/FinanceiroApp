import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { styleControl } from '../styles/styleControl';
import { FlexModal } from '../modal/modalWallet';
import { useFetchData, useModalHandlers } from '../logics/controleScreenLogics';
import Card from '../modal/cards/card';
import { EditWalletModal } from '../modal/modalEditWallet';
import { Item } from '../interfaces/interfaces';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { expenses } from '../interfaces/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Carousel from 'react-native-sideswipe';
import { WithdrawModalWallet } from '../modal/saqueWalet';
import { DepositModal } from '../modal/depositWallet';

export type RootStackParamList = {
    ExpensesScreen: undefined;
    ExpenseDetails: { data: expenses[] };
};

const { width } = Dimensions.get('window');

type ExpensesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpensesScreen'>;


export function ExpensesScreen() {

    const navigation = useNavigation<ExpensesScreenNavigationProp>();


    const [walletModalVisible, setWalletModalVisible] = useState(false);
    const [expenseModalVisible, setExpenseModalVisible] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [withdrawVisible, setWithdraw] = useState(false);
    const [depositVisible, setDepositVisible] = useState(false)

    const [refreshData, setRefreshData] = useState(false);

    const [addItem, setAddItem] = useState(false);

    const { dataWallet, dataExpenses, dataExpensesPiechart, loading, refetchData } = useFetchData(refreshData || addItem); // Passa `expenseAdded` para o hook
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
        if (refreshData) {
            setRefreshData(false); // Impede a recarga contínua quando os dados já foram atualizados
        }
    }, [refreshData]);

    useEffect(() => {
        if (addItem) {
            setAddItem(false)
        }
    }, [addItem])

    const isDataEmpty = dataExpensesPiechart.length === 0;
    const isDataWalleteEmpty = dataWallet.length === 0;

    const walletDefault = [{
        id: '',
        banco: 'Nenhum Banco Cadastrado',
        valor: 0,
    }];

    const handleEditSubmit = (formData: { [key: string]: string | number }) => {
        setEditModalVisible(false);
    };

    const handlePieChartPress = () => {
        navigation.navigate('ExpenseDetails', { data: dataExpenses }); // Navegar para a tela ExpenseDetails
    };

    const handleEdit = (item: Item) => {
        setSelectedItem(item)
        setEditModalVisible(true)
    };

    const handleDelete = (item: Item) => {

    };

    const handleWithdraw = (item: Item) => {
        setSelectedItem(item)
        setWithdraw(true)
    };

    const handleDeposit = (item: Item) => {
        setSelectedItem(item)
        setDepositVisible(true)
    };

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styleControl.containerCarousel}>
            <Card
                banco={item.banco}
                valor={item.valor}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item)}
                onWithdraw={() => handleWithdraw(item)}
                onDeposit={() => handleDeposit(item)}
            />
        </View>
    );


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
                    {isDataWalleteEmpty ? (
                        <Carousel
                            data={walletDefault}
                            itemWidth={width * 0.8}
                            contentOffset={(width - width * 0.8) / 2}
                            renderItem={renderItem}
                            // onIndexChange={(index) => console.log(`Current index: ${index}`)}
                            threshold={0.5}
                            useVelocityForIndex={true}

                        />
                    ) : (
                        <Carousel
                            data={dataWallet}
                            itemWidth={width * 0.8}
                            contentOffset={(width - width * 0.8) / 2}
                            renderItem={renderItem}
                            // onIndexChange={(index) => console.log(`Current index: ${index}`)}
                            threshold={0.5}
                            useVelocityForIndex={true}

                        />
                    )}
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
                                data={[{ name: 'Sem Dados', population: 1 }]}
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
                        refresh={refetchData}
                    />
                )}

                {selectedItem && (
                    <WithdrawModalWallet
                        modalVisible={withdrawVisible}
                        onClose={() => setWithdraw(false)}
                        onUpdate={refetchData}
                        item={selectedItem}
                    />
                )}

                {selectedItem && (
                    <DepositModal
                        modalVisible={depositVisible}
                        onClose={() => setDepositVisible(false)}
                        onUpdate={refetchData}
                        item={selectedItem}
                    />
                )}
            </View>
        </ScrollView>
    )
}