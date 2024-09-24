import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { deleteWallet } from '../functions/DELETE/wallet';
import { editWallet } from '../functions/PATH/wallet';
import { Item, walletFormat } from '../interfaces/interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface EditWalletModalProps {
    modalVisible: boolean;
    onClose: () => void;
    fields: { name: string; placeholder: string; type?: string }[];
    onSubmit: (formData: { [key: string]: string | number }) => void;
    item: walletFormat;
    refresh: () => void;
}

export const EditWalletModal: React.FC<EditWalletModalProps> = ({ modalVisible, onClose, fields, onSubmit, item, refresh }) => {
    const [formData, setFormData] = useState<Item>({
        id: '',
        banco: '',
        valor: 0,
    });

    // Sempre que o item mudar, atualiza o formData com os valores do item selecionado
    useEffect(() => {
        if (item) {
            setFormData({
                id: item.id,
                banco: item.banco,
                valor: item.valor,
            });
        }
    }, [item]);

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: field === 'valor' ? Number(value) : value,
        });
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Editar</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        {fields.map((field, index) => (
                            <View key={index}>
                                <Text>{field.name}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={field.placeholder}
                                    value={String(formData[field.name] || '')}
                                    keyboardType={field.type === 'numeric' ? 'numeric' : 'default'}
                                    onChangeText={(value) => handleInputChange(field.name, value)}
                                />
                            </View>
                        ))}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={
                                    () => {
                                        editWallet(formData)
                                        refresh()
                                        onClose()
                                    }}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={
                                    () => {
                                        deleteWallet(formData)
                                        refresh()
                                        onClose()
                                    }}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
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
    modalBody: {
        marginTop: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
