import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import ClientsList from "./ClientsList";
import styles from '../../styles/PartnerPageComponent.module.css';
import logo_realty_hub from '../../content/logo/Frame.png';


const PartnerPage = () => {

    const location = useLocation();
    const userData = location.state || {};
    const [data, setData] = useState(null);
    const API_URL = "http://localhost:8090/private";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("location : ", location);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get(`${API_URL}/get_user/${userData.username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                setError(error.message || 'Что-то пошло не так');
            } finally {
                setLoading(false);
            }
        };

        console.log(userData.username);

        
        if (userData.username || userData.username === undefined) {
            fetchData();
        }
    }, [userData.username]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return(
        <div>
            <div className={styles.header}>
                <div className={styles.logo_header}>
                    <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
                </div>
            </div>
            <div className={styles.partner}>
                <p className={styles.hello_partner}>{data}, добро пожаловать!</p>
                <div className={styles.link_container}>
                    <Link to="/create_build" className={styles.partner_link}>Добавить новый объект</Link>
                    <Link to = "/create_user" className={styles.partner_link}>Добавить сотрудника</Link>
                    <Link to = "/create_client" className={styles.partner_link}>Добавить клиента</Link>
                    <Link to = "/all_builds" className={styles.partner_link}>Просмотреть все объекты</Link>
                    <Link to = "/all_clients" className={styles.partner_link}>Наши клиенты</Link>
                </div>
                <p className={styles.hello_partner}>Наши клиенты RealtyHub.ME :</p>
                <ClientsList username={data}/>
            </div>
        </div>
    )
}

export default PartnerPage;