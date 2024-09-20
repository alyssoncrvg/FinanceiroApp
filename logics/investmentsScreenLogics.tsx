import { useEffect, useState } from "react"
import { apiRequest } from "../api/api";
import { FormDataInvestments } from "../interfaces/interfaces";
import { addInvestments } from "../functions/POST/investimentos";


export const useFechDataInvestments = (InvestmentsAdded: boolean) => {
    const [investmentsData, setInvestmentData] = useState<any[]>([]);

    const fechData = async () => {
        try{

            const investments = await apiRequest('/get/investimentos')
            const formDataInvestments = investments.map((investment:any) =>({
                name: investment.bolsa,
                population: investment.valor,
                color: getRandomColor(),
                legendFontColor: '#000000',
                legendFontSize: 15,
            }));

            setInvestmentData(formDataInvestments)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fechData()
    }, [InvestmentsAdded])

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return { investmentsData }
}

export const useModalInvestmentsHandle = (
    setInvestmentsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setInvestmentAdded: React.Dispatch<React.SetStateAction<boolean>>
) => {

    const addModalInvestment = () => setInvestmentsModalVisible(true);
    const closeModalInvestment = () => setInvestmentsModalVisible(false);

    const handleInvestments = async (formData: FormDataInvestments) => {

        addInvestments(formData);
        setInvestmentAdded((prev) => !prev)
        closeModalInvestment();
    }

    return { addModalInvestment, closeModalInvestment, handleInvestments }

}