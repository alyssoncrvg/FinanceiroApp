import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';

type CardProps = {
  banco: string;
  valor: number;
  onEdit: () => void;
  onDelete: () => void;
  onWithdraw: () => void;
  onDeposit: () => void;
};

const { width } = Dimensions.get('window');

const Card: React.FC<CardProps> = ({ banco, valor, onEdit, onDelete, onWithdraw, onDeposit }) => {
  return (
    
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>{banco}</Text>
            <Text style={styles.cardDescription}>{`${valor.toFixed(2)} R$`}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <Menu>
              <MenuTrigger>
                  <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={onEdit}>
                  <Text style={styles.menuOption}>Editar/Excluir</Text>
                </MenuOption>
                <MenuOption onSelect={onWithdraw}>
                  <Text style={styles.menuOption}>Sacar</Text>
                </MenuOption>
                <MenuOption onSelect={onDeposit}>
                  <Text style={styles.menuOption}>Depositar</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: 120,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    position: 'absolute',
    right: 0,
    transform: [{ translateY: -12 }],
},
menuTrigger: {
    fontSize: 35,
    color: 'gray',
    fontWeight: 'bold',
},
menuOption: {
    padding: 10,
},
});

export default Card;
