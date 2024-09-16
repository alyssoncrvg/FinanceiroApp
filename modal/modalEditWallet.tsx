import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { deleteWallet } from '../functions/DELETE/wallet';
import { editWallet } from '../functions/PATH/wallet';

interface Item {
    id: string;
    banco: string;
    valor: number;
}

interface EditWalletModalProps {
    modalVisible: boolean;
    onClose: () => void;
    fields: { name: string; placeholder: string; type?: string }[];
    onSubmit: (formData: { [key: string]: string | number }) => void;
    item: Item;
}

export const EditWalletModal: React.FC<EditWalletModalProps> = ({ modalVisible, onClose, fields, onSubmit, item }) => {
    const [formData, setFormData] = useState<{ [key: string]: string | number }>({
        banco: item.banco,
        valor: item.valor,
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    console.log(item.id)

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Editar</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
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
                            <TouchableOpacity onPress={() => editWallet(item.id)} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteWallet(item.id)} style={styles.deleteButton}>
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
