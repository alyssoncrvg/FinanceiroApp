// FlexModal.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FormDataInvestments } from '../interfaces/interfaces';

interface ModalProps {
    modalVisible: boolean;
    onClose: () => void;
    onSubmit: (formData: FormDataInvestments) => void; // Função de submissão
}

export const FlexModalInvestments: React.FC<ModalProps> = ({ modalVisible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormDataInvestments>({
    id: '',
    bolsa: '',
    valor: 0,
  });

  // Função para lidar com alterações nos inputs
  const handleInputChange = (field: keyof FormDataInvestments, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Campos específicos de bolsa e valor */}
          <View style={styles.modalBody}>
            <Text>Bolsa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da bolsa"
              onChangeText={(value) => handleInputChange('bolsa', value)}
            />

            <Text>Valor</Text>
            <TextInput
              style={styles.input}
              placeholder="Valor"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('valor', Number(value))}
            />

            {/* Botão de Salvar */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                onSubmit(formData);
                onClose(); 
              }}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
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
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
