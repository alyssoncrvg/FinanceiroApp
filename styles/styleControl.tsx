import { StyleSheet } from "react-native"

export const styleControl = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'sans-serif', 
        fontWeight: 'normal',
        paddingBottom: 80,
    },
    loadingContainer: {
        flex: 1,                
        justifyContent: 'center', 
        alignItems: 'center',   
        backgroundColor: '#f5f5f5', 
      },
    containerCarousel: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center', 
        paddingEnd: 10
      },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff'
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
        justifyContent: 'center', 
        alignItems: 'center', 
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
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%', 
        
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
        paddingVertical: 5,
        paddingHorizontal: 16, 
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
        paddingVertical: 10, 
        alignItems: 'center', 
    },
    paginationDot: {
        width: 10,            
        height: 10,          
        borderRadius: 5,      
        marginHorizontal: 8,  
        backgroundColor: 'rgba(0, 0, 0, 0.92)',  
    }
})