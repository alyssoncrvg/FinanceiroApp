import { StyleSheet } from 'react-native';

export const styleNavigation = StyleSheet.create({
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
      },
})