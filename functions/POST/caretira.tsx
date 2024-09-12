import { Alert } from "react-native";

export const addWallet = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/carteiras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                "banco": "TESTE",
                "saldo": 5000
                
            }),
        })

        if (response.ok) {
            Alert.alert('Sucesso', 'Carteira adicionada com sucesso!');
        } else {
            Alert.alert('Erro', 'Falha ao adicionar carteira.');
        }


    } catch (error){

    }
}