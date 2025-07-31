/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/CreateClient.module.css";
import HeaderComponent from "../component/users/HeaderComponent";

const FormCreateClient = () => {
  const [msg, setMsg] = useState("");
  const API_URL = "https://realtyhubengine-production.up.railway.app/rivate";

  const [Client, setClient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    numberPhone: "",
    type: "",
    income: "",
    description: "",
    manager: "",
  });

  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const usersResponse = await axios.get(`${API_URL}/get_all_users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = usersResponse.data;
        setManagers(usersData);

        setLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...Client, [name]: value });
  };

  const save = (client) => {
    console.log(Client);
    const token = Cookies.get("token");
    return axios.post(API_URL + "/add_new_client", client, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const createClient = (e) => {
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

    save(formData)
      .then((res) => {
        setMsg("User Added Successfully!");
        setClient({
          firstName: "",
          lastName: "",
          email: "",
          numberPhone: "",
          type: "",
          income: "",
          description: "",
          manager: "",
        });
      })
      .catch((error) => {
        Cookies.remove("token");
        console.error("Error : ", error);
      });
  };

  return (
    <div>
      <HeaderComponent />
      <div className={styles.add_client}>
        <div>
          <Link to="/partner_page">partner page</Link>
          <h3>Новый клиент</h3>
          <form onSubmit={(e) => createClient(e)}>
            <label>Имя</label>
            <input
              type="text"
              name="firstName"
              value={Client.firstName}
              onChange={handleChange}
            />
            <label>Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={Client.lastName}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={Client.email}
              onChange={handleChange}
            />
            <label>Номер телефона</label>
            <input
              type="text"
              name="numberPhone"
              value={Client.numberPhone}
              onChange={handleChange}
            />
            <label>Тип сделки</label>
            <select name="type" value={Client.type} onChange={handleChange}>
              <option value="unknown">Выберите из списка</option>
              <option value="Покупка">Покупка</option>
              <option value="Аренда">Аренда</option>
              <option value="Продажа">Продажа</option>
              <option value="Сдача">Сдача</option>
            </select>
            <label>Бюджет</label>
            <input
              type="text"
              name="income"
              value={Client.income}
              onChange={handleChange}
            />
            <label>Описание</label>
            <input
              type="text"
              name="description"
              value={Client.description}
              onChange={handleChange}
            />
            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCreateClient;
