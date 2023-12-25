import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../actions/action";
import Cookies from "js-cookie";
import ClientsList from "./ClientsList";
import styles from '../../styles/PartnerPageComponent.module.css';
import logo_realty_hub from '../../content/logo/Frame.png';


const PartnerPage = () => {
    const location = useLocation();
    const userDataLocation = location.state || {};
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const API_URL = "http://localhost:8090/private";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserData = localStorage.getItem('userData');
                if (storedUserData) {
                    dispatch(setUserData(JSON.parse(storedUserData)));
                }

                if (!storedUserData || userDataLocation.username) {
                    const token = Cookies.get('token');
                    const res = await axios.get(`${API_URL}/get_user/${userDataLocation.username}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    dispatch(setUserData(res.data));
                    
                    localStorage.setItem('userData', JSON.stringify(res.data));
                }
            } catch (error) {
                setError(error.message || 'Что-то пошло не так');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, userDataLocation.username]);
    

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if(true) {
        console.log("user data : ", userData);
    }

    return(
        <div>
            <div className={styles.header}>
                <div className={styles.logo_header}>
                    <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
                </div>
            </div>
            <div className={styles.partner}>
                <p className={styles.hello_partner}>{userData.name}, добро пожаловать!</p>
                <div className={styles.link_container}>
                    <Link to="/create_build" className={styles.partner_link}>Добавить новый объект</Link>
                    <Link to = "/create_user" className={styles.partner_link}>Добавить сотрудника</Link>
                    <Link to = "/create_client" className={styles.partner_link}>Добавить клиента</Link>
                    <Link to = "/all_builds" className={styles.partner_link}>Просмотреть все объекты</Link>
                    <Link to = "/all_clients" className={styles.partner_link}>Наши клиенты</Link>
                </div>
                <p className={styles.hello_partner}>Наши клиенты RealtyHub.ME :</p>
                <ClientsList username={userData.clientsList}/>
            </div>
        </div>
    )
}

export default PartnerPage;