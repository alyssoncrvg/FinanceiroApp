import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FormDataGoal } from '../interfaces/interfaces';
import * as Icons from '@expo/vector-icons'; // Importa a biblioteca de ícones
import { Picker } from '@react-native-picker/picker';

interface FlexModalProps {
  modalVisible: boolean;
  onClose: () => void;
  onSubmit: (formData: FormDataGoal) => void;
}

type IconName = 'phone-portrait' | 'home' | 'car' | 'airplane' | 'book' | 'heart' | 'film' | 'cash' | 'gift' | 'ellipsis-horizontal';

interface IconOption {
  label: string;
  icon: IconName;
}

export const FlexModalGoal: React.FC<FlexModalProps> = ({ modalVisible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormDataGoal>({
    id: '',
    icon: 'phone-portrait', // Valor padrão
    titulo: '',
    targetAmount: 0,
    currentAmount: 0,
    forecast: new Date(),
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconName>('phone-portrait');

  useEffect(() => {
    if (modalVisible) {
      setFormData((prevData) => ({
        ...prevData,
        icon: 'phone-portrait', // Resetar para valor padrão
        titulo: '',
        targetAmount: 0,
        currentAmount: 0,
        forecast: new Date(),
      }));
    }
  }, [modalVisible]);

  const handleInputChange = (field: keyof FormDataGoal, value: string) => {
    setFormData({
      ...formData,
      [field]: field === 'targetAmount' || field === 'currentAmount' ? Number(value) : value,
    });
  };

  const handleIconChange = (iconName: IconName) => {
    setSelectedIcon(iconName);
    handleInputChange('icon', iconName); // Atualiza o estado do formulário com o ícone selecionado
  };

  const handleDateChange = (dateString: string) => {
    const selectedDate = new Date(dateString);
    if (selectedDate > new Date()) {
      setFormData({
        ...formData,
        forecast: selectedDate,
      });
      setShowCalendar(false);
    } else {
      Alert.alert('Erro', 'Por favor, selecione uma data futura.');
    }
  };

  const handleDayPress = (day: { dateString: string }) => {
    handleDateChange(day.dateString);
  };

  const validateForm = (): boolean => {
    const { icon, titulo, targetAmount, currentAmount, forecast } = formData;
    if (!icon || !titulo || isNaN(targetAmount) || isNaN(currentAmount) || targetAmount <= 0 || currentAmount < 0 || forecast <= new Date()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const iconOptions: IconOption[] = [
    { label: 'Eletrônicos', icon: 'phone-portrait' },
    { label: 'Casa Nova', icon: 'home' },
    { label: 'Carro Novo', icon: 'car' },
    { label: 'Férias', icon: 'airplane' },
    { label: 'Educação', icon: 'book' },
    { label: 'Saúde', icon: 'heart' },
    { label: 'Entretenimento', icon: 'film' },
    { label: 'Investimentos', icon: 'cash' },
    { label: 'Presentes', icon: 'gift' },
    { label: 'Outros', icon: 'ellipsis-horizontal' }
  ];

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Adicionar Nova Meta</Text>
            <TouchableOpacity onPress={onClose}>
              <Icons.Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text>Ícone</Text>
            <View style={styles.iconPickerContainer}>
              <Icons.Ionicons name={selectedIcon} size={50} color="black" />
              <Picker
                selectedValue={selectedIcon}
                style={styles.picker}
                onValueChange={(itemValue) => handleIconChange(itemValue as IconName)}
              >
                {iconOptions.map((option) => (
                  <Picker.Item key={option.icon} label={option.label} value={option.icon} />
                ))}
              </Picker>
            </View>

            <Text>Título</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              onChangeText={(value) => handleInputChange('titulo', value)}
              value={formData.titulo}
            />

            <Text>Meta (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Meta (R$)"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('targetAmount', value)}
              value={formData.targetAmount.toString()}
            />

            <Text>Valor Atual (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Valor Atual (R$)"
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('currentAmount', value)}
              value={formData.currentAmount.toString()}
            />

            <Text>Previsão</Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <TextInput
                style={styles.input}
                placeholder="Previsão (YYYY-MM-DD)"
                editable={false}
                value={formData.forecast.toISOString().split('T')[0]}
              />
            </TouchableOpacity>

            {showCalendar && (
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={handleDayPress}
                  minDate={minDate} // Define a data mínima
                  markedDates={{ [formData.forecast.toISOString().split('T')[0]]: { selected: true, marked: true } }}
                  theme={{
                    todayTextColor: 'blue',
                    selectedDayBackgroundColor: 'blue',
                    selectedDayTextColor: 'white',
                    dayTextColor: 'black',
                    textDisabledColor: '#d0d0d0',
                  }}
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
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
    padding: 5,
  },
  calendarContainer: {
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
  iconPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    width: 150,
    height: 50,
  },
});
