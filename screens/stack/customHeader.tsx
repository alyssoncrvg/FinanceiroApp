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
        height: 80, 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
      },
      backButton: {
        marginRight: 15, 
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
  });

export default CustomHeader;