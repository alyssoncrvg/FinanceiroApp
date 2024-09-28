import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
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
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditWalletModal: React.FC<EditWalletModalProps> = ({ modalVisible, onClose, fields, onSubmit, item, refresh, loading, setLoading }) => {
    const [formData, setFormData] = useState<Item>({
        id: '',
        banco: '',
        valor: 0,
    });

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

    const handleSave = async () => {
        setLoading(true); 
        try {
            await editWallet(formData);
            refresh(); 
            onClose(); 
        } catch (error) {
            console.error("Erro ao salvar:", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleDelete = async () => {
        setLoading(true); 
        try {
            await deleteWallet(formData);
            refresh();
            onClose();
        } catch (error) {
            console.error("Erro ao excluir:", error);
        } finally {
            setLoading(false); 
        }
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
                                style={[styles.saveButton, loading && styles.buttonDisabled]}
                                onPress={handleSave}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Salvar</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.deleteButton, loading && styles.buttonDisabled]}
                                onPress={handleDelete}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Excluir</Text>
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
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    buttonDisabled: {
        backgroundColor: '#a5a5a5', 
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
