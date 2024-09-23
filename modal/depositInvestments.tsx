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

export const DepositModal: React.FC<DepositInvestmentsModalProps> = ({modalVisible, onClose, onSubmit, onUpdate, item}) => {

    const [formData, setFormData] = useState<FormDataInvestments>({
        _id: '',
        bolsa: '',
        valor: 0,
        date: new Date(),
    });

    const { dataWallet, refetchData } = useFetchData(true); // Hook para buscar carteiras
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null); // Carteira selecionada

    useEffect(() => {
        if (item) {
            setFormData({
                _id: item._id,
                bolsa: item.bolsa,
                valor: item.valor,
                date: item.date,
            });
        }
    }, [item]);

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: field === 'valor' ? Number(value) : value,
        });
    };

    const handleSubmit = async () => {
        if (selectedWallet) {
            const wallet = dataWallet.find(w => w.id === selectedWallet);

            if (wallet && wallet.valor >= formData.valor) {
                // Atualize o saldo da carteira
                const updatedWallet = {
                    ...wallet,
                    valor: wallet.valor - formData.valor, // Subtrai o valor do depósito
                };

                const updatedInvestment = {
                    ...formData,
                    valor: item.valor + formData.valor, // Soma o valor do depósito ao valor atual do investimento
                };

                await editWallet(updatedWallet); // Atualiza a carteira na API
                await editInvestment(updatedInvestment);  // Atualiza o investimento

                refetchData()
                onUpdate(updatedInvestment); // Atualiza o investimento no estado local
                onClose(); // Fecha o modal
            } else {
                Alert.alert("Saldo insuficiente na carteira selecionada: ", selectedWallet);
            }
        }
    };

    const availableWallets = dataWallet.filter((wallet: { valor: number; }) => wallet.valor >= formData.valor); // Filtra carteiras com saldo suficiente

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Depositar em {formData.bolsa}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o valor"
                        keyboardType="numeric"
                        onChangeText={(value) => handleInputChange('valor', value)}
                    />

                    <Picker
                        selectedValue={selectedWallet || undefined}
                        onValueChange={(itemValue: string) => setSelectedWallet(itemValue)}
                    >
                        <Picker.Item label="Selecione uma carteira" value="" />
                        {availableWallets.map((wallet: { id: any; banco: any; valor: any; }) => (
                            <Picker.Item key={wallet.id} label={`${wallet.banco} - R$ ${wallet.valor}`} value={wallet.id} />
                        ))}
                    </Picker>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Depositar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

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