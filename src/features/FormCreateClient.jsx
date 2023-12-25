/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import logo_realty_hub from '../content/logo/Frame.png';
import styles from '../styles/CreateClient.module.css';

const FormCreateClient = () => {
    const[msg, setMsg] = useState("");
    const API_URL = "http://localhost:8090/private";

    const [Client, setClient] = useState({
        firstName : "",
        lastName : "",
        email : "",
        numberPhone : "",
        type : "",
        income : "",
        description : "",
        manager : ""
    })

    

    const handleChange = e => {
        const {name, value} = e.target;
        setClient({...Client, [name]:value})
    }

    const save = (client) => {
        const token = Cookies.get('token');
        return axios.post(API_URL+"/add_new_client", client, {
            headers : {
                'Authorization': `Bearer ${token}` 
            }
        });
    }

    const createClient = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstName", Client.firstName);
        formData.append("lastName", Client.lastName);
        formData.append("email", Client.email);
        formData.append("numberPhone", Client.numberPhone);
        formData.append("type", Client.type);
        formData.append("income", Client.income);
        formData.append("description", Client.description);
        formData.append("manager", Client.manager);

        save(formData).then((res) => {
            setMsg("User Added Successfully!");
            setClient({
                firstName : "",
                lastName : "",
                email : "",
                numberPhone : "",
                type : "",
                income : "",
                description : "",
                manager : ""
            });
        }).catch((error) => {
            console.error("Error : ", error);
        })
    };

    return(
        <div>
            <div className={styles.header}>
                <div className={styles.logo_header}>
                  <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
                </div>
            </div>
            <div className={styles.add_client}>
            <div>
                <a href="/partner_page">partner page</a>
                <h3>Новый клиент</h3>
                <form onSubmit={(e) => createClient(e)}>
                <label>Имя</label>
                <input type="text" name="firstName" value={Client.firstName} onChange={handleChange} />
                <label>Фамилия</label>
                <input type="text" name="lastName" value={Client.lastName} onChange={handleChange} />
                <label>Email</label>
                <input type="email" name="email" value={Client.email} onChange={handleChange} />
                <label>Номер телефона</label>
                <input type="text" name="numberPhone" value={Client.numberPhone} onChange={handleChange} />
                <label>Тип сделки</label>
                <select name="type" value={Client.type} onChange={handleChange}>
                    <option value="unknown">Выберите из списка</option>
                    <option value="Покупка">Покупка</option>
                    <option value="Аренда">Аренда</option>
                    <option value="Продажа">Продажа</option>
                    <option value="Сдача">Сдача</option>
                </select>
                <label>Бюджет</label>
                <input type="text" name="income" value={Client.income} onChange={handleChange} />
                <label>Описание</label>
                <input type="text" name="description" value={Client.description} onChange={handleChange} />
                <label>Менеджер</label>
                <input type="text" name="manager" value={Client.manager} onChange={handleChange} />
                <input type="submit" value="Create" />
                </form>
            </div>
            </div>
        </div>
    )
}

export default FormCreateClient;