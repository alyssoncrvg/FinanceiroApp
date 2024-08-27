import { StyleSheet } from "react-native";

export const styleInvestment = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    simulatorContainer: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
    },
    actionSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      width: '50%',
      textAlign: 'right',
    },
    positiveVariation: {
      color: 'green',
      fontWeight: 'bold',
    },
    negativeVariation: {
      color: 'red',
      fontWeight: 'bold',
    },
    simulateButton: {
      backgroundColor: '#ccc',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    simulateButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    returnText: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
    },
    returnValue: {
      color: 'red',
      fontWeight: 'bold',
    },
    portfolioContainer: {
      marginBottom: 30,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    newInvestmentButton: {
      backgroundColor: '#8B00FF',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    newInvestmentButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  