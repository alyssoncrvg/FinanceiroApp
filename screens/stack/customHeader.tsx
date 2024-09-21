import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ title }: { title: string }) => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    headerContainer: {
        height: 80, // Ajuste a altura do cabeçalho aqui
        flexDirection: 'row', // Alinha o botão e o título horizontalmente
        alignItems: 'center', // Centraliza verticalmente
        backgroundColor: '#fff',
        paddingHorizontal: 15,
      },
      backButton: {
        marginRight: 15, // Espaço entre o botão de voltar e o título
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
  });

export default CustomHeader;