import React, { useState, useLayoutEffect, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormDataInvestments } from '../../interfaces/interfaces';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../stack/customHeader';
import { EditInvestmentsModal } from '../../modal/editInvestments';
import { deleteInvestment } from '../../functions/DELETE/investments';

// Defina o tipo das rotas
type RootStackParamList = {
    InvestmentDetails: { data: FormDataInvestments[] };
};

// Utilize NativeStackScreenProps para pegar `route` e `navigation`
type Props = NativeStackScreenProps<RootStackParamList, 'InvestmentDetails'>;

export const DetailInvestmentScreen = ({ route, navigation }: Props) => {
    const { data } = route.params; // Acessa os dados passados pela navegação
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPayVisible, setModalPayVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FormDataInvestments | null>(null);
    const [selectedItemPay, setSelectedItemPay] = useState<FormDataInvestments | null>(null);
    const [dataLocal, setData] = useState<FormDataInvestments[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title="Detalhes dos Investimentos" />,
        });
    }, [navigation]);

    useEffect(() => {
        setData(data); // Inicializa os dados com os investimentos passados via props
    }, [data]);

    const handleEditSubmit = (formData: { [key: string]: string | number }) => {
        setModalVisible(false);
    };

    const handlePress = (item: FormDataInvestments) => {
        setSelectedItem(item); // Define o item selecionado para edição
        setModalVisible(true); // Abre o modal de edição
    };

    const handleUpdate = (updatedItem: FormDataInvestments) => {
        const updatedData = dataLocal.map((investment) =>
            investment._id === updatedItem._id ? updatedItem : investment
        );
        setData(updatedData); // Atualiza o estado local com os dados editados
    };

    const handleDelete = (investment: FormDataInvestments) => {
        deleteInvestment(investment)
        const updatedData = dataLocal.filter(item => item._id !== investment._id);

        // Força a criação de um novo array, mesmo que ele esteja vazio
        setData([...updatedData]);
    };

    const handlePay = (investment: FormDataInvestments) => {

        setSelectedItemPay(investment);
        setModalPayVisible(true); // Abre o modal de pagamento
    };

    return (
        <MenuProvider>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {dataLocal.map((investment: FormDataInvestments) => (
                        <View style={styles.investmentItem} key={investment._id}>
                            <View style={styles.content}>
                                <View>
                                    <Text style={styles.investmentName}>{investment.bolsa}</Text>
                                    <Text style={styles.investmentAmount}>R$ {investment.valor.toFixed(2)}</Text>
                                </View>
                                <View style={styles.menuContainer}>
                                    <Menu>
                                        <MenuTrigger>
                                            <Text style={styles.menuTrigger}>...</Text>
                                        </MenuTrigger>
                                        <MenuOptions>
                                            <MenuOption onSelect={() => handlePress(investment)}>
                                                <Text style={styles.menuOption}>Editar</Text>
                                            </MenuOption>
                                            <MenuOption onSelect={() => handleDelete(investment)}>
                                                <Text style={styles.menuOption}>Excluir</Text>
                                            </MenuOption>
                                        </MenuOptions>
                                    </Menu>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {selectedItem && (
                <EditInvestmentsModal
                    modalVisible={modalVisible}
                    onClose={() => setModalVisible(false)}

                    onSubmit={handleEditSubmit}
                    onUpdate={handleUpdate}
                    item={selectedItem}
                />
            )}

        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80,
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    investmentItem: {
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
    investmentName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    investmentAmount: {
        fontSize: 16,
        color: 'gray',
    },
    menuContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        position: 'absolute',
        right: 0,
        transform: [{ translateY: -12 }],
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
