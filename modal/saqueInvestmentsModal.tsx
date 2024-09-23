import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FormDataInvestments } from "../interfaces/interfaces";
import { editInvestment } from "../functions/PATH/investments";
import { editWallet } from "../functions/PATH/wallet";

import { useFetchData } from "../logics/controleScreenLogics";

interface DepositInvestmentsModalProps {
    modalVisible: boolean;
    onClose: () => void;
    onSubmit: (formData: { [key: string]: string | number }) => void;
    onUpdate: (updatedItem: FormDataInvestments) => void;
    item: FormDataInvestments;
}

export const WithdrawModal: React.FC<DepositInvestmentsModalProps> = ({
    modalVisible,
    onClose,
    onSubmit,
    onUpdate,
    item,
}) => {
    const [formData, setFormData] = useState<FormDataInvestments>({
        _id: '',
        bolsa: '',
        valor: 0,
        date: new Date(),
    });

    const { dataWallet, refetchData } = useFetchData(true); // Hook para buscar carteiras
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null); // Carteira selecionada

    useEffect(() => {
        if (item && modalVisible) {
            setFormData({
                _id: item._id,
                bolsa: item.bolsa,
                valor: item.valor,
                date: item.date,
            });
        }
    }, [item, modalVisible]);

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: field === 'valor' ? Number(value) : value,
        });
    };

    const handleSubmit = async () => {
        if (selectedWallet) {
            if (formData.valor > item.valor) {
                Alert.alert("Saldo insuficiente no investimento.");
                return;
            }

            const wallet = dataWallet.find(w => w.id === selectedWallet);

            if (wallet) {
                // Atualize o saldo do investimento (subtrai o valor do saque)
                const updatedInvestment = {
                    ...formData,
                    valor: item.valor - formData.valor, // Subtrai o valor do saque do valor atual do investimento
                };

                // Atualize o saldo da carteira (adiciona o valor do saque)
                const updatedWallet = {
                    ...wallet,
                    valor: wallet.valor + formData.valor, // Soma o valor do saque ao saldo da carteira
                };

                await editWallet(updatedWallet); // Atualiza a carteira na API
                await editInvestment(updatedInvestment);  // Atualiza o investimento

                refetchData(); // Recarregue os dados da carteira
                onUpdate(updatedInvestment); // Atualiza o investimento no estado local
                onClose(); // Fecha o modal
            } else {
                Alert.alert("Erro ao selecionar a carteira de destino.");
            }
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Sacar de {formData.bolsa}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o valor do saque"
                        keyboardType="numeric"
                        onChangeText={(value) => handleInputChange('valor', value)}
                    />

                    <Picker
                        selectedValue={selectedWallet || undefined}
                        onValueChange={(itemValue: string) => setSelectedWallet(itemValue)}
                    >
                        <Picker.Item label="Selecione uma carteira para receber" value="" />
                        {dataWallet.map((wallet: { id: any; banco: any; valor: any; }) => (
                            <Picker.Item key={wallet.id} label={`${wallet.banco} - R$ ${wallet.valor}`} value={wallet.id} />
                        ))}
                    </Picker>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Sacar</Text>
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
        flexDirection:
        'row',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});