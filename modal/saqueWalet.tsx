import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert, ActivityIndicator } from "react-native";
import { Item } from "../interfaces/interfaces";
import { editWallet } from "../functions/PATH/wallet";

import { useFetchData } from "../logics/controleScreenLogics";
import { addMovent } from "../functions/POST/movimentacoes";
import Ionicons from "react-native-vector-icons/Ionicons";

interface WithdrawModalProps {
    modalVisible: boolean;
    onClose: () => void;
    onUpdate: (updatedItem: Item) => void;
    item: Item;
}

export const WithdrawModalWallet: React.FC<WithdrawModalProps> = ({
    modalVisible,
    onClose,
    onUpdate,
    item,
}) => {
    const [formData, setFormData] = useState<Item>({
        id: '',
        banco: '',
        valor: 0,
    });

    const { dataWallet, refetchData } = useFetchData(true);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item && modalVisible) {
            setFormData({
                id: item.id,
                banco: item.banco,
                valor: item.valor,
            });
        }
    }, [item, modalVisible]);

    const handleInputChange = (value: string) => {
        setFormData({
            ...formData,
            valor: Number(value),
        });
    };

    const handleWithdraw = async () => {

        if (formData.valor > item.valor) {
            Alert.alert("Saldo insuficiente na carteira.");
            return;
        }

        if (item) {
            setLoading(true); 
            try {
                const updatedItem = {
                    ...item,
                    valor: item.valor - formData.valor,
                };

                await editWallet(updatedItem);
                onUpdate(updatedItem);
                await addMovent(formData.valor * (-1))
                refetchData();
                onClose();
            } catch (error) {
                Alert.alert("Erro", "Ocorreu um erro ao realizar o saque.");
            }
        } else {
            Alert.alert("Erro ao selecionar a carteira de destino.");
        }

    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Sacar de {formData.banco}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o valor do saque"
                        keyboardType="numeric"
                        onChangeText={handleInputChange}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                            onPress={handleWithdraw}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Depositar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        fontSize: 18,
        color: 'red',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    saveButtonDisabled: {
        backgroundColor: '#a5a5a5',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
