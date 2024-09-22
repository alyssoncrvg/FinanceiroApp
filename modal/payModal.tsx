import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { expenses, walletFormat } from '../interfaces/interfaces';
import { useFetchData } from '../logics/controleScreenLogics';

interface PayModalProps {
  modalVisible: boolean;
  onClose: () => void;
  expense: expenses;
  onDelete: (expense: expenses)=> void;
}

export const PayModal: React.FC<PayModalProps> = ({ modalVisible, onClose, expense, onDelete }) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { dataWallet } = useFetchData(true, true);

  const handlePay = () => {
    if (selectedWallet) {
      // Adicione aqui a lógica para processar o pagamento com base no ID da carteira selecionada
      console.log(`Pagamento de ${expense.valor} feito com a carteira ${selectedWallet}`);
      onDelete(expense);
      onClose();
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
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.buttonText}>Pagar</Text>
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
