import { StyleSheet } from 'react-native';

export const styleHome = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom:80,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: '#fff',
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    balanceText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    subText: {
      fontSize: 14,
      color: '#7F7F7F',
    },
    summaryContainer: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    summaryContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    summaryItem: {
      width: '48%',
      backgroundColor: '#f8f8f8',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    summaryText: {
      marginTop: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
    accountsContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    accountItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    accountText: {
      fontSize: 16,
      marginLeft: 10,
      flex: 1,
    },
    accountBalance: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    expensesContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      paddingBottom: 80,
    },
  });
  