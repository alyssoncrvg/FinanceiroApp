import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { expenses } from '../../interfaces/interfaces';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import CustomHeader from '../stack/customHeader';
import { deleteExpense } from '../../functions/DELETE/expenses';
import { EditExpensesModal } from '../../modal/editExpenses';
import { PayModal } from '../../modal/payModal';


type RootStackParamList = {
    ExpenseDetails: { data: any[] };
    ExpenseItensDetails: { group: string; data: expenses[] };
};

type ExpenseItensDetailsRouteProp = RouteProp<RootStackParamList, 'ExpenseItensDetails'>;
type ExpenseItensDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpenseItensDetails'>;

type Props = {
    route: ExpenseItensDetailsRouteProp;
};

export const ExpenseItensDetails = ({ route }: Props) => {

    const { group, data } = route.params;

    const [modalVisible, setModalVisible] = useState(false)
    const [modalPayVisible, setModalPayVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<expenses | null>(null);
    const [selectedItemPay, setSelectedItemPay] = useState<expenses | null>(null);

    const [dataLocal, setData] = useState<expenses[]>([]);

    const navigation = useNavigation<ExpenseItensDetailsNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title={group} />
        });
    }, [navigation, group]);

    useEffect(() => {
        setData(data);
    }, [data]);

    const handleEditSubmit = (formData: { [key: string]: string | number }) => {
        setModalVisible(false);
    };

    function handlePress(item: expenses) {
        setSelectedItem(item); 
        setModalVisible(true); 
    }

    const handleUpdate = (updatedItem: expenses) => {
        const oldItem = dataLocal.find(item => item._id === updatedItem._id);
        if (oldItem && oldItem.categoria !== updatedItem.categoria) {
            const updatedData = dataLocal.filter(item => item._id !== updatedItem._id);
            setData(updatedData);
        } else {
            const updatedData = dataLocal.map((item) =>
                item._id === updatedItem._id ? updatedItem : item
            );
            setData(updatedData);
        }
    };

    const handleDelete = async (expense: expenses) => {
        await deleteExpense(expense).then(() => {
            const updatedData = data.filter(item => item._id !== expense._id);
            setData(updatedData); 
        }).catch(error => {
            console.error("Erro ao excluir despesa:", error);
        });
    };

    const handlePay = (expense: expenses) => {
        setSelectedItemPay(expense)
        setModalPayVisible(true)
    };

    return (

        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {dataLocal.map((expense: expenses) => (

                    <View style={styles.expenseItem} key={expense._id}>
                        <View style={styles.content}>
                            <View>
                                <Text style={styles.expenseName}>{expense.descricao}</Text>
                                <Text style={styles.expenseAmount}>R$ {expense.valor.toFixed(2)}</Text>
                            </View>
                            <View style={styles.menuContainer}>
                                <Menu>
                                    <MenuTrigger>
                                        <Text style={styles.menuTrigger}>...</Text>
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption onSelect={() => handlePress(expense)}>
                                            <Text style={styles.menuOption}>Editar</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => handleDelete(expense)}>
                                            <Text style={styles.menuOption}>Excluir</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => handlePay(expense)}>
                                            <Text style={styles.menuOption}>Pagar</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </View>
                    </View>

                ))}
            </View>

            {selectedItem && (
                <EditExpensesModal
                    modalVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    fields={[
                        { name: 'descricao', placeholder: 'Descrição' },
                        { name: 'valor', placeholder: '0.00', type: 'numeric' },
                        { name: 'categoria', placeholder: 'Categoria' }
                    ]}
                    onSubmit={handleEditSubmit}
                    onUpdate={handleUpdate}
                    item={selectedItem}
                />
            )}

            {selectedItemPay && (
                <PayModal
                    modalVisible={modalPayVisible}
                    onClose={() => setModalPayVisible(false)}
                    expense={selectedItemPay}
                    onDelete={handleDelete}
                />
            )}

        </ScrollView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80,
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    expenseItem: {
        marginBottom: 15,
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row', 
        alignItems: 'center',
        flex: 1, 
    },
    expenseName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    expenseAmount: {
        fontSize: 16,
        color: 'gray',
    },
    menuContainer: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginLeft: 10, 
        marginRight: 0, 
        position: 'absolute', 
        right: 0, 
        transform: [{ translateY: -12 }] 
    },
    menuTrigger: {
        fontSize: 35,
        color: 'gray',
        fontWeight: 'bold',
    },
    menuOption: {
        padding: 10,
    },
});
