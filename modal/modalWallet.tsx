// FlexModal.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface FlexModalProps {
  modalVisible: boolean;
  onClose: () => void;
  fields: { name: string; placeholder: string; type?: string }[]; // Lista de campos dinâmicos
  onSubmit: (formData: { [key: string]: string | number }) => void; // Função de submissão
}

export const FlexModal: React.FC<FlexModalProps> = ({ modalVisible, onClose, fields, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});

  // Função para lidar com alterações nos inputs
  const handleInputChange = (field: string, value: string) => {
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
              style={styles.saveButton}
              onPress={() => {
                onSubmit(formData); // Chama a função de submissão com os dados do formulário
                onClose(); // Fecha o modal
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
