import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';
import styles from '../../styles/ClientList.module.css';

const ClientsList = ({username}) => {
    const API_URL = "http://localhost:8090/private";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [hasResponse, setDataResponse] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("token");
                const response = await axios.get(`${API_URL}/clients`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data);
                setDataResponse(true);
            } catch (error) {
                setError(error.message || "OOOPS");
            } finally {
                setLoading(false);
            }
        };

        if(!hasResponse) {
            fetchData();
        }
    }, [hasResponse, data]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return(
        <div>
            <div className={styles.clients_container}>
                {data.map(client => (
                    <div key={client.id} className={styles.client_card}>
                        <p>Имя : {client.firstName}</p>                        
                        <p>Фамилия : {client.lastName}</p>                        
                        <p>Телефон : {client.numberPhone}</p>                    
                        <p>Бюджет : {client.income} EUR</p>                        
                        <p>Тип сделки : {client.type}</p>
                        <p>Работает с менеджером : {client.manager}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientsList;