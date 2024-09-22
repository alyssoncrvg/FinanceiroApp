const BASE_URL = 'http://10.0.2.2:3000/api';
// 172.18.57.151  10.0.2.2  192.168.0.120

export const apiRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
    const url = `${BASE_URL}${endpoint}`;

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
};
