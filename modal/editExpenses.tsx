import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { editExpenses } from '../functions/PATH/expenses';
import { expenses } from '../interfaces/interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface EditExpensesModalProps {
    modalVisible: boolean;
    onClose: () => void;
    fields: { name: string; placeholder: string; type?: string }[];
    onSubmit: (formData: { [key: string]: string | number }) => void;
    onUpdate: (updatedItem: expenses) => void;
    item: expenses;
}

export const EditExpensesModal: React.FC<EditExpensesModalProps> = ({ modalVisible, onClose, fields, onSubmit, onUpdate, item }) => {
    const [formData, setFormData] = useState<expenses>({
        _id: '',
        descricao: '',
        categoria: '',
        valor: 0,
        date: new Date(),
    });

    // Atualiza formData com os valores da despesa selecionada
    useEffect(() => {
        if (item) {
            setFormData({
                _id: item._id,
                descricao: item.descricao,
                categoria: item.categoria,
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

    const handleSubmit = () => {
        editExpenses(formData);
        onUpdate(formData); // Chama a função de atualização com os dados atualizados
        onClose();
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Editar Despesa</Text>
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
                                    value={String(formData[field.name as keyof expenses] || '')}
                                    keyboardType={field.type === 'numeric' ? 'numeric' : 'default'}
                                    onChangeText={(value) => handleInputChange(field.name, value)}
                                />
                            </View>
                        ))}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => {
                                    handleSubmit() // Função para editar a despesa
                                }}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
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
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
