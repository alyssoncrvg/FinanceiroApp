import { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { FormDataGoal } from "../interfaces/interfaces";
import { Modal, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { editGoal } from "../functions/PATH/goal";
import { deleteGoal } from "../functions/DELETE/goal";

interface EditGoalProps {
    modalVisible: boolean;
    onClose: () => void;
    onSubmit: (formData: FormDataGoal) => void;
    item: FormDataGoal;
    setItemUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditGoalModel: React.FC<EditGoalProps> = ({ modalVisible, onClose, onSubmit, item, setItemUpdated }) => {

    const [showCalendar, setShowCalendar] = useState(false);

    const [formData, setFormData] = useState<FormDataGoal>({
        id: '',
        categoria: '',
        titulo: '',
        targetAmount: 0,
        currentAmount: 0,
        forecast: new Date(),
    })

    useEffect(() => {
        if (item) {
            setFormData({
                id: item.id,
                categoria: item.categoria,
                titulo: item.titulo,
                targetAmount: item.targetAmount,
                currentAmount: item.currentAmount,
                forecast: item.forecast
            })
        }
    }, [item])

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
        const { categoria, titulo, targetAmount, currentAmount, forecast } = formData;
        if (!categoria || !titulo || isNaN(targetAmount) || isNaN(currentAmount) || targetAmount <= 0 || currentAmount < 0 || forecast <= new Date()) {
            Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
            setItemUpdated(true); // Marca o item como atualizado
            onClose();
        }
    };

    const today = new Date();
    const minDate = today.toISOString().split("T")[0];

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Editar Meta</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        <Text>Categoria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Categoria"
                            onChangeText={(value) => handleInputChange("categoria", value)}
                            value={formData.categoria}
                        />

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
                                value={formData.forecast instanceof Date ? formData.forecast.toISOString().split("T")[0] : ""}
                            />
                        </TouchableOpacity>

                        {showCalendar && (
                            <View style={styles.calendarContainer}>
                                <Calendar
                                    onDayPress={handleDayPress}
                                    minDate={minDate}
                                    markedDates={{ [formData.forecast.toISOString().split("T")[0]]: { selected: true, marked: true } }}
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

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={
                                    () => {
                                        editGoal(formData)
                                        setItemUpdated((prev) => !prev);
                                        onClose()
                                    }}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={
                                    () => {
                                        deleteGoal(formData)
                                        setItemUpdated((prev) => !prev);
                                        onClose()
                                    }}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal >
      );
    };


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        fontSize: 18,
        color: "red",
    },
    modalBody: {
        marginTop: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 10,
        padding: 5,
    },
    calendarContainer: {
        marginBottom: 10,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
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