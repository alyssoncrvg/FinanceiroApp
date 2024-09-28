import React, { useState, useLayoutEffect, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormDataInvestments } from '../../interfaces/interfaces';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../stack/customHeader';
import { EditInvestmentsModal } from '../../modal/editInvestments';
import { deleteInvestment } from '../../functions/DELETE/investments';
import { DepositModal } from '../../modal/depositInvestments';
import { WithdrawModal } from '../../modal/saqueInvestmentsModal';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
    InvestmentDetails: { data: FormDataInvestments[] };
};


type Props = NativeStackScreenProps<RootStackParamList, 'InvestmentDetails'>;

export const DetailInvestmentScreen = ({ route, navigation }: Props) => {
    const { data } = route.params; 
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FormDataInvestments | null>(null);

    const [dataLocal, setData] = useState<FormDataInvestments[]>([]);
    const [modalDeposito, setModalDeposito] = useState(false)
    const [modalSaque, setModalSaque] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => <CustomHeader title="Detalhes dos Investimentos" />,
        });
    }, [navigation]);

    useEffect(() => {
        setData(data); 
    }, [data]);

    const handleEditSubmit = (formData: { [key: string]: string | number }) => {
        setModalVisible(false);
        setModalDeposito(false)
        setModalSaque(false)
    };

    const handlePress = (item: FormDataInvestments) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleSaque = (item: FormDataInvestments) => {
        setSelectedItem(item);
        setModalSaque(true); 
    };

    const handleDeposito = (item: FormDataInvestments) => {
        setSelectedItem(item);
        setModalDeposito(true);
    };

    const handleUpdate = (updatedItem: FormDataInvestments) => {
        const updatedData = dataLocal.map((investment) =>
            investment._id === updatedItem._id ? updatedItem : investment
        );
        setData(updatedData); 
    };

    const handleDelete = async (investment: FormDataInvestments) => {
        await deleteInvestment(investment)
        const updatedData = dataLocal.filter(item => item._id !== investment._id);

        setData([...updatedData]);
    };
    return (
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
                                        <Ionicons name="ellipsis-vertical" size={24} color="black" />
                                    </MenuTrigger>
                                    <MenuOptions>
                                        <MenuOption onSelect={() => handlePress(investment)}>
                                            <Text style={styles.menuOption}>Editar</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => handleDelete(investment)}>
                                            <Text style={styles.menuOption}>Excluir</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => handleDeposito(investment)}>
                                            <Text style={styles.menuOption}>Depositar</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => handleSaque(investment)}>
                                            <Text style={styles.menuOption}>Sacar</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {selectedItem && (
                <EditInvestmentsModal
                    modalVisible={modalVisible}
                    onClose={() => setModalVisible(false)}

                    onSubmit={handleEditSubmit}
                    onUpdate={handleUpdate}
                    item={selectedItem}
                />
            )}

            {selectedItem && (
                <DepositModal
                    modalVisible={modalDeposito}
                    onClose={() => setModalDeposito(false)}
                    onSubmit={handleEditSubmit}
                    onUpdate={handleUpdate}
                    item={selectedItem}
                />
            )}

            {selectedItem && (
                <WithdrawModal
                    modalVisible={modalSaque}
                    onClose={() => setModalSaque(false)}
                    onSubmit={handleEditSubmit}
                    onUpdate={handleUpdate}
                    item={selectedItem}
                />
            )}

        </ScrollView>

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
