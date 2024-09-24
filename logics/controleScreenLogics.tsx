import { useState, useEffect } from 'react';
import { addWallet } from '../functions/POST/caretira';
import { addExpenses } from '../functions/POST/despesas';
import { apiRequest } from '../api/api';
import { expenses, GroupedExpense } from '../interfaces/interfaces';
import { Alert } from 'react-native';

interface FormData {
    [key: string]: string | number;
}

const groupByCategory = (gastos: any[]) => {
    return gastos.reduce((acc, gasto) => {
        if (!acc[gasto.categoria]) {
            acc[gasto.categoria] = {
                categoria: gasto.categoria,
                somaValue: 0,
                gastos: [],
            };
        }
        acc[gasto.categoria].somaValue += gasto.valor;
        acc[gasto.categoria].gastos.push(gasto);
        return acc;
    }, {} as Record<string, { categoria: string; somaValue: number; gastos: expenses[] }>);
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const useFetchData = (expenseAdded: boolean) => {
    const [dataExpenses, setData] = useState<any[]>([]);
    const [dataExpensesPiechart, setDataPiechart] = useState<any[]>([]);
    const [dataExpensesOthers, setDataOthers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataWallet, setDataWallet] = useState<any[]>([]);
    const [topWallets, setTopWallets] = useState<any[]>([]);
    const [sumWallet, setSumWallet] = useState(0);

    const fetchData = async () => {
        try {
            const gastos = await apiRequest('/get/gastos');

            if (gastos.length === 0) {
                setData([]);
                setDataPiechart([]);
                setDataOthers([]);
            } else {
                const groupedGastos = groupByCategory(gastos);
                const formattedDataG: GroupedExpense[] = Object.values(groupedGastos);

                const formattedData = formattedDataG.map((group: any) => ({
                    name: group.categoria,
                    population: group.somaValue,
                    color: getRandomColor(),
                    legendFontColor: '#000000',
                    legendFontSize: 15,
                }));

                const sortedGastos = gastos.sort((a: any, b: any) => b.valor - a.valor);
                const top3Gastos = sortedGastos.slice(0, 3).map((gasto: any) => ({
                    name: gasto.categoria,
                    population: gasto.valor,
                    color: getRandomColor(),
                    legendFontColor: '#000000',
                    legendFontSize: 15,
                }));

                const outrosGastos = sortedGastos.slice(3);
                const totalOutros = outrosGastos.reduce((sum: number, gasto: any) => sum + gasto.valor, 0);

                const formattedDataOthers = [
                    ...top3Gastos,
                    {
                        name: 'Outros',
                        population: totalOutros,
                        color: getRandomColor(),
                        legendFontColor: '#000000',
                        legendFontSize: 15,
                    },
                ];

                setDataOthers(formattedDataOthers);
                setData(formattedDataG);
                setDataPiechart(formattedData);
            }
        } catch (error) {
            console.error('Erro ao buscar os dados de gastos:', error);
        }

        try {
            const wallet = await apiRequest('/get/carteiras');
            const walletFormat = wallet.map((wallet: any) => ({
                id: wallet._id,
                banco: wallet.banco,
                valor: wallet.saldo,
            }));

            setDataWallet(walletFormat);
            const sortedWallets = walletFormat.sort((a: any, b: any) => b.valor - a.valor);
            const totalSaldo = sortedWallets.reduce((acc: number, wallet: any) => acc + wallet.valor, 0);

            const topTwoWallets = sortedWallets.slice(0, 2);

            setTopWallets(topTwoWallets);
            setSumWallet(totalSaldo);
            
        } catch (error) {
            Alert.alert('Erro ao buscar carteiras')
        } finally {
            // Loading só será atualizado aqui, após todas as requisições serem finalizadas
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [expenseAdded]);

    return { dataWallet, sumWallet, dataExpenses, dataExpensesPiechart, dataExpensesOthers, topWallets, loading, refetchData: fetchData };
};


export const useModalHandlers = (
    setWalletModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setExpenseModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
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
        closeModalWallet();
    };

    const handleAddDespesas = async (formData: FormData) => {
        const descricao = String(formData.descricao);
        const valor = Number(formData.valor);
        const categoria = String(formData.categoria);

        await addExpenses(descricao, valor, categoria);
        closeModalExpense(); // Fecha o modal após adicionar a despesa
    };

    return { addModalWallet, closeModalWallet, addModalExpense, closeModalExpense, handleAddCarteira, handleAddDespesas };
};
