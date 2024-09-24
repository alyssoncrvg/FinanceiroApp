import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FlexModalProps } from '../interfaces/interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const FlexModal: React.FC<FlexModalProps> = ({ modalVisible, onClose, fields, onSubmit, setAddItem, loading, setLoading }) => {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});

  // Função para lidar com alterações nos inputs
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    setLoading(true); // Inicia o carregamento
    try {
      await onSubmit(formData); // Chama a função de submissão com os dados do formulário
      setAddItem(true);
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false); // Para o carregamento
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Gerar campos dinâmicos com base nos campos passados via props */}
          <View style={styles.modalBody}>
            {fields.map((field, index) => (
              <View key={index}>
                <Text>{field.name}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  keyboardType={field.type === 'numeric' ? 'numeric' : 'default'}
                  onChangeText={(value) => handleInputChange(field.name, value)}
                />
              </View>
            ))}

            {/* Botão de Salvar */}
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar</Text>
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
  modalBody: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#a5a5a5', // Cor de fundo para o botão desativado
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
