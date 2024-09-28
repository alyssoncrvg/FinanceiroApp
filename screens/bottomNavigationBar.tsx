import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styleNavigation } from '../styles/styleNavigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../interfaces/interfaces'; 

export function BottomNavigationBar() {
    const [activeTab, setActiveTab] = useState<string>('Home');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleTabPress = (tabName: keyof RootStackParamList) => {
        setActiveTab(tabName);
        navigation.navigate(tabName);
    };

    return (
        <View style={styleNavigation.navigationBar}>
            <TouchableOpacity onPress={() => handleTabPress('Home')}>
                <Ionicons 
                    name="home" 
                    size={32} 
                    color={activeTab === 'Home' ? "#007AFF" : "#000"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Investments')}>
                <Ionicons 
                    name="stats-chart" 
                    size={32} 
                    color={activeTab === 'Investments' ? "#007AFF" : "#000"} 
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Control')}>
                <Ionicons 
                    name="pie-chart" 
                    size={32} 
                    color={activeTab === 'Control' ? "#007AFF" : "#000"} 
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Goals')}>
                <Ionicons 
                    name="cash" 
                    size={32} 
                    color={activeTab === 'Goals' ? "#007AFF" : "#000"} 
                />
            </TouchableOpacity>
        </View>

    );
}
