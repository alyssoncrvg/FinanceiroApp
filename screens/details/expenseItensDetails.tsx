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
        // Lógica para editar o item
        setModalVisible(false);
    };

    function handlePress(item: expenses) {
        setSelectedItem(item); // Define o item selecionado
        setModalVisible(true); // Abre o modal
    }

    const handleUpdate = (updatedItem: expenses) => {
        const oldItem = dataLocal.find(item => item._id === updatedItem._id);
        if (oldItem && oldItem.categoria !== updatedItem.categoria) {
            // Remove o item da lista se a categoria mudou
            const updatedData = dataLocal.filter(item => item._id !== updatedItem._id);
            setData(updatedData);
        } else {
            // Atualiza o item na lista local
            const updatedData = dataLocal.map((item) =>
                item._id === updatedItem._id ? updatedItem : item
            );
            setData(updatedData);
        }
    };

    const handleDelete = (expense: expenses) => {
        deleteExpense(expense).then(() => {
            // Remover o item do array localmente após exclusão
            const updatedData = data.filter(item => item._id !== expense._id);
            setData(updatedData); // Atualiza o array localmente
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
        flexDirection: 'row', // Alinha os itens horizontalmente
        alignItems: 'center', // Alinha verticalmente os itens no centro
    },
    content: {
        flexDirection: 'row', // Alinha os itens horizontalmente
        alignItems: 'center', // Alinha verticalmente os itens no centro
        flex: 1, // Faz o conteúdo ocupar o espaço disponível
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
        flexDirection: 'column', // Alinha os itens verticalmente
        justifyContent: 'center', // Alinha verticalmente os itens no centro
        marginLeft: 10, // Espaço entre o conteúdo e o menu
        marginRight: 0, // Remove qualquer margem direita
        position: 'absolute', // Posiciona o container absolutamente
        right: 0, // Alinha à direita do card
        // top: '50%', // Alinha verticalmente ao meio
        transform: [{ translateY: -12 }] // Ajusta para centralizar verticalmente
    },
    menuTrigger: {
        fontSize: 35, // Tamanho do ícone de menu
        color: 'gray',
        fontWeight: 'bold',
    },
    menuOption: {
        padding: 10,
    },
});
