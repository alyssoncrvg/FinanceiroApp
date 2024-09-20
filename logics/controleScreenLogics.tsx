import { useState, useEffect } from 'react';
import { addWallet } from '../functions/POST/caretira';
import { addExpenses } from '../functions/POST/despesas';
import { apiRequest } from '../api/api';

interface FormData {
    [key: string]: string | number;
}

export const useFetchData = (expenseAdded: boolean, itemUpdated: boolean) => { // Removeu o setter de estado e agora monitora diretamente expenseAdded
    const [dataExpenses, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataWallet, setDataWallet] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const gastos = await apiRequest('/get/gastos');
            const formattedData = gastos.map((gasto: any) => ({
                name: gasto.categoria,
                population: gasto.valor,
                color: getRandomColor(),
                legendFontColor: '#000000',
                legendFontSize: 15,
            }));

            setData(formattedData);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar os dados de gastos:', error);
            setLoading(false);
        }

        try {
            const wallet = await apiRequest('/get/carteiras');
            const walletFormat = wallet.map((wallet:any) => ({
                id: wallet._id,
                banco: wallet.banco,
                valor: wallet.saldo,
            }));

            setDataWallet(walletFormat);
            setLoading(false);
        } catch (error) {
            console.log('Erro ao buscar os dados de carteiras:', error);
            setLoading(false);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        fetchData();
    }, [expenseAdded, itemUpdated]); // Reexecuta o fetch sempre que `expenseAdded` mudar

    return { dataWallet, dataExpenses, loading };
};

export const useModalHandlers = (
    setWalletModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setExpenseModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setExpenseAdded: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const addModalWallet = () => setWalletModalVisible(true);
    const closeModalWallet = () => setWalletModalVisible(false);

    const addModalExpense = () => setExpenseModalVisible(true);
    const closeModalExpense = () => setExpenseModalVisible(false);

    const handleAddCarteira = (formData: FormData) => {
        const banco = String(formData.banco);
        const saldo = Number(formData.saldo);

        if (isNaN(saldo)) {
            console.error('Erro: O saldo informado não é um número válido');
            return;
        }
        addWallet(banco, saldo);
        setExpenseAdded((prev) => !prev);
        closeModalWallet();
    };

    const handleAddDespesas = async (formData: FormData) => {
        const descricao = String(formData.descricao);
        const valor = Number(formData.valor);
        const categoria = String(formData.categoria);

        await addExpenses(descricao, valor, categoria);
        setExpenseAdded((prev) => !prev); // Atualiza `expenseAdded` para acionar o re-fetch
        closeModalExpense(); // Fecha o modal após adicionar a despesa
    };

    return { addModalWallet, closeModalWallet, addModalExpense, closeModalExpense, handleAddCarteira, handleAddDespesas };
};
