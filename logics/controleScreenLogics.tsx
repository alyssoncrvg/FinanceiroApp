import { useState, useEffect } from 'react';
import { addWallet } from '../functions/POST/caretira';
import { addExpenses } from '../functions/POST/despesas';
import { apiRequest } from '../api/api';
import { useExpenses } from '../context/context';
import { expenses, GroupedExpense } from '../interfaces/interfaces';

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

export const useFetchData = (expenseAdded: boolean, itemUpdated: boolean) => { // Removeu o setter de estado e agora monitora diretamente expenseAdded
    const [dataExpenses, setData] = useState<any[]>([]);
    const [dataExpensesPiechart, setDataPiechart] = useState<any[]>([]);
    const [dataExpensesOthers, setDataOthers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataWallet, setDataWallet] = useState<any[]>([]);
    const [topWallets, setTopWallets] = useState<any[]>([]);
    
    const { setSumWallet } = useExpenses()

    const fetchData = async () => {
        try {
            const gastos = await apiRequest('/get/gastos');
    
            // Agrupar gastos por categoria e calcular a soma
            const groupedGastos = groupByCategory(gastos);
            
            // Transformar os dados agrupados em um array
            const formattedDataG: GroupedExpense[] = Object.values(groupedGastos);
            
            // Formatar os dados para o gráfico de pizza
            const formattedData = formattedDataG.map((group:any) => ({
                name: group.categoria,
                population: group.somaValue,
                color: getRandomColor(),
                legendFontColor: '#000000',
                legendFontSize: 15,
            }));
            
            // Ordenar os gastos do maior para o menor valor
            const sortedGastos = gastos.sort((a: any, b: any) => b.valor - a.valor);
            
            // Selecionar os 3 maiores gastos
            const top3Gastos = sortedGastos.slice(0, 3).map((gasto: any) => ({
                name: gasto.categoria,
                population: gasto.valor,
                color: getRandomColor(),
                legendFontColor: '#000000',
                legendFontSize: 15,
            }));
            
            // Calcular o valor total dos demais gastos
            const outrosGastos = sortedGastos.slice(3);
            const totalOutros = outrosGastos.reduce((sum: number, gasto: any) => sum + gasto.valor, 0);
            
            // Adicionar a categoria "Outros" para os demais gastos
            const formattedDataOthers = [
                ...top3Gastos,
                {
                    name: 'Outros',
                    population: totalOutros,
                    color: getRandomColor(),
                    legendFontColor: '#000000',
                    legendFontSize: 15,
                }
            ];

            setDataOthers(formattedDataOthers);
            setData(formattedDataG);
            setDataPiechart(formattedData);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar os dados de gastos:', error);
            setLoading(false);
        }

        try {
            const wallet = await apiRequest('/get/carteiras');
            const walletFormat = wallet.map((wallet: any) => ({
                id: wallet._id,
                banco: wallet.banco,
                valor: wallet.saldo,
            }));

            // Ordenar carteiras pelo saldo (valor) em ordem decrescente
            const sortedWallets = walletFormat.sort((a: any, b: any) => b.valor - a.valor);

            const totalSaldo = sortedWallets.reduce((acc: number, wallet: any) => acc + wallet.valor, 0);

            // Selecionar as duas carteiras com maiores valores
            const topTwoWallets = sortedWallets.slice(0, 2);

            setTopWallets(topTwoWallets); // Atualiza as duas maiores carteiras
            setSumWallet(totalSaldo);
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

    return { dataWallet, dataExpenses, dataExpensesPiechart, dataExpensesOthers, topWallets, loading };
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
