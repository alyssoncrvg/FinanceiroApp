import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { expenses, walletFormat } from '../interfaces/interfaces';
import { useFetchData } from '../logics/controleScreenLogics';
import { editWallet } from '../functions/PATH/wallet';
import { addMovent } from '../functions/POST/movimentacoes';

interface PayModalProps {
    modalVisible: boolean;
    onClose: () => void;
    expense: expenses;
    onDelete: (expense: expenses) => void;
}

export const PayModal: React.FC<PayModalProps> = ({ modalVisible, onClose, expense, onDelete }) => {
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { dataWallet } = useFetchData(true);

    const handlePay = async () => {
        if (selectedWallet) {
            setLoading(true); 
            const wallet = dataWallet.find(w => w.id === selectedWallet);

            if (wallet) {
                
                const updatedWallet = {
                    ...wallet,
                    valor: wallet.valor - expense.valor 
                };

                try {
                    await editWallet(updatedWallet);
                    await addMovent(expense.valor * (-1));
                    onDelete(expense);
                    onClose(); 
                } catch (error) {
                    console.error("Erro ao pagar despesa:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("Carteira não encontrada");
            }
        }
    };

    const availableWallets = dataWallet.filter(wallet => wallet.valor >= expense.valor);

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Pagar Despesa</Text>
                    <Picker
                        selectedValue={selectedWallet || undefined}
                        onValueChange={(itemValue: string) => setSelectedWallet(itemValue)}
                    >
                        <Picker.Item label="Selecione uma carteira" value="" />
                        {availableWallets.map(wallet => (
                            <Picker.Item key={wallet.id} label={`${wallet.banco} - R$ ${wallet.valor}`} value={wallet.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity
                        style={[styles.payButton, loading && styles.payButtonDisabled]}
                        onPress={handlePay}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Pagar</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    payButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    payButtonDisabled: {
        backgroundColor: '#a5a5a5', 
    },
    closeButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
