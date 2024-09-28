import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { FormDataGoal } from "../interfaces/interfaces";
import { Modal, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { editGoal } from "../functions/PATH/goal";
import { deleteGoal } from "../functions/DELETE/goal";
import * as Icons from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Icon } from "react-native-vector-icons/Icon";

interface EditGoalProps {
    modalVisible: boolean;
    onClose: () => void;
    onSubmit: (formData: FormDataGoal) => void;
    item: FormDataGoal;
    setItemUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IconOption {
    label: string;
    icon: IconName;
}

type IconName = 'phone-portrait' | 'home' | 'car' | 'airplane' | 'book' | 'heart' | 'film' | 'cash' | 'gift' | 'ellipsis-horizontal';

export const EditGoalModel: React.FC<EditGoalProps> = ({ modalVisible, onClose, onSubmit, item, setItemUpdated }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<IconName>('phone-portrait');
    const [formData, setFormData] = useState<FormDataGoal>({
        id: '',
        icon: '',
        titulo: '',
        targetAmount: 0,
        currentAmount: 0,
        forecast: new Date(),
    });
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (item) {
            setFormData({
                id: item.id,
                icon: item.icon,
                titulo: item.titulo,
                targetAmount: item.targetAmount,
                currentAmount: item.currentAmount,
                forecast: item.forecast
            });
            setSelectedIcon(item.icon as IconName);
        }
    }, [item]);

    const handleInputChange = (field: keyof FormDataGoal, value: string) => {
        setFormData({
            ...formData,
            [field]: field === "targetAmount" || field === "currentAmount" ? Number(value) : value,
        });
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
            Alert.alert("Erro", "Por favor, selecione uma data futura.");
        }
    };

    const handleDayPress = (day: { dateString: string }) => {
        handleDateChange(day.dateString);
    };

    const validateForm = (): boolean => {
        const { icon, titulo, targetAmount, currentAmount, forecast } = formData;
        if (!icon || !titulo || isNaN(targetAmount) || isNaN(currentAmount) || targetAmount <= 0 || currentAmount < 0 || forecast <= new Date()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setLoading(true);
            try {
                await editGoal(formData);
                setItemUpdated(true);
                onClose();
            } catch (error) {
                Alert.alert("Erro", "Ocorreu um erro ao salvar a meta.");
            } finally {
                setLoading(false); 
            }
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteGoal(formData);
            setItemUpdated(true);
            onClose();
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao excluir a meta.");
        } finally {
            setLoading(false);
        }
    };

    const handleIconChange = (iconName: IconName) => {
        setSelectedIcon(iconName);
        handleInputChange('icon', iconName);
    };

    const today = new Date();
    const minDate = today.toISOString().split("T")[0];

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
                        <Text style={styles.modalTitle}>Editar Meta</Text>
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
                            onChangeText={(value) => handleInputChange("titulo", value)}
                            value={formData.titulo}
                        />

                        <Text>Meta (R$)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Meta (R$)"
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange("targetAmount", value)}
                            value={formData.targetAmount.toString()}
                        />

                        <Text>Valor Atual (R$)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Valor Atual (R$)"
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange("currentAmount", value)}
                            value={formData.currentAmount.toString()}
                        />

                        <Text>Previsão</Text>
                        <TouchableOpacity onPress={() => setShowCalendar(true)}>
                            <TextInput
                                style={styles.input}
                                placeholder="Previsão (YYYY-MM-DD)"
                                editable={false}
                                value={formData.forecast
                                    ? new Date(formData.forecast).toISOString().split("T")[0]
                                    : ""}
                            />
                        </TouchableOpacity>

                        {showCalendar && (
                            <View style={styles.calendarContainer}>
                                <Calendar
                                    onDayPress={handleDayPress}
                                    minDate={minDate}
                                    markedDates={{
                                        [new Date(formData.forecast).toISOString().split("T")[0]]: {
                                            selected: true,
                                            marked: true
                                        }
                                    }}
                                    theme={{
                                        todayTextColor: "blue",
                                        selectedDayBackgroundColor: "blue",
                                        selectedDayTextColor: "white",
                                        dayTextColor: "black",
                                        textDisabledColor: "#d0d0d0",
                                    }}
                                />
                            </View>
                        )}

                        {loading ? (
                            <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
                        ) : (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={handleSubmit}
                                    disabled={loading} 
                                >
                                    <Text style={styles.buttonText}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={handleDelete}
                                    disabled={loading} 
                                >
                                    <Text style={styles.buttonText}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
      buttonDisabled: {
        backgroundColor: '#B0B0B0',
      },
      saveButtonText: {
        color: 'white',
        fontSize: 16,
      },
      picker: {
        height: 50,
        width: 150,
      },
      iconPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
    },
    loadingIndicator: {
        alignSelf: "center",
        marginVertical: 20,
    },
});
