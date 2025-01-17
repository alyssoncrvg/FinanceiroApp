import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { editInvestment } from '../functions/PATH/investments';
import { FormDataInvestments } from '../interfaces/interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface EditInvestmentsModalProps {
    modalVisible: boolean;
    onClose: () => void;
    onSubmit: (formData: { [key: string]: string | number }) => void;
    onUpdate: (updatedItem: FormDataInvestments) => void;
    item: FormDataInvestments;
}

export const EditInvestmentsModal: React.FC<EditInvestmentsModalProps> = ({ modalVisible, onClose, onUpdate, onSubmit, item }) => {
    const [formData, setFormData] = useState<FormDataInvestments>({
        _id: '',
        bolsa: '',
        valor: 0,
        date: new Date(),
    });

    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            await editInvestment(formData);
            onUpdate(formData);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Editar Investimento</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        <Text>Bolsa</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a bolsa"
                            value={formData.bolsa}
                            onChangeText={(value) => handleInputChange('bolsa', value)}
                        />
                        <Text>Valor</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o valor"
                            value={String(formData.valor)}
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange('valor', value)}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.saveButton, loading && styles.buttonDisabled]}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Salvar</Text>
                                )}
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
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    buttonDisabled: {
        backgroundColor: '#a5a5a5', 
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
