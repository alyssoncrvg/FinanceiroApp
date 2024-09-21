import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { expenses } from '../../interfaces/interfaces';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import CustomHeader from '../stack/customHeader';

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

    const navigation = useNavigation<ExpenseItensDetailsNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title={group} />
        });
    }, [navigation, group]);

    const handleEdit = (expense: expenses) => {
        // Implementar lógica de edição
    };

    const handleDelete = (expense: expenses) => {
        // Implementar lógica de exclusão
    };

    const handlePay = (expense: expenses) => {
        // Implementar lógica de pagamento
    };

    return (
        <MenuProvider>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {data.map((expense: expenses) => (

                        <View style={styles.expenseItem}>
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
                                            <MenuOption onSelect={() => handleEdit(expense)}>
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
            </ScrollView>
        </MenuProvider>
    );
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
