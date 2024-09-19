import { StyleSheet } from "react-native"

export const styleControl = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'sans-serif', 
        fontWeight: 'normal',
    },
    containerCarousel: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', // Alinha o carrossel verticalmente ao centro
        paddingEnd: 10
        // alignItems: 'center', // Alinha o carrossel horizontalmente ao centro
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
        paddingLeft: 20,
        justifyContent: 'center', // Alinha o carrossel verticalmente ao centro
        alignItems: 'center', // Alinha o carrossel horizontalmente ao centro
        marginTop: 20
    },
    walletsContainer: {
        paddingVertical:20,
        paddingHorizontal: 0,
        alignItems: 'center',
        width:'100%'
    },
    walletsContent: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Espaça os itens para a esquerda e direita
        alignItems: 'center',
        width: '100%', // Garante que ocupe toda a largura
        
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
        backgroundColor: '#820AD1',
        paddingVertical: 5, // Aumenta o padding verticalmente
        paddingHorizontal: 16, // Aumenta o padding horizontalmente
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
    expensesContainer: {
        paddingVertical: 20,
        paddingHorizontal: 0,
    },
    paginationContainer: {
        paddingVertical: 10,  // Espaçamento vertical ao redor dos dots
        alignItems: 'center', // Centraliza os dots horizontalmente
    },
    paginationDot: {
        width: 10,            // Largura dos dots
        height: 10,           // Altura dos dots
        borderRadius: 5,      // Torna os dots redondos
        marginHorizontal: 8,  // Espaçamento horizontal entre os dots
        backgroundColor: 'rgba(0, 0, 0, 0.92)',  // Cor dos dots
    }
})