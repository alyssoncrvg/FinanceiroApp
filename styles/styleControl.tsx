import { StyleSheet } from "react-native"

export const styleControl = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingLeft: 20,
    },
    walletsContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    walletsContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletItem: {
        width: '75%',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
    },
    walletName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7F7F7F',
    },
    walletBalance: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    addButton: {
        backgroundColor: '#6A5ACD',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    expensesContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
})