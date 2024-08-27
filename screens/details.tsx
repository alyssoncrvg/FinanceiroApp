import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

// Defina os tipos de parâmetros que cada tela aceita
type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

// Defina o tipo das propriedades do componente DetailsScreen
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export function DetailsScreen({ navigation }: DetailsScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title='return'
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  