import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/CreateUser.module.css";
import { Link } from "react-router-dom";
import HeaderComponent from "../component/users/HeaderComponent";

const FormUserComponent = () => {
  const [setMsg] = useState("");
  const API_URL = "https://realtyhubengine-production.up.railway.app/private";

  const [User, setUser] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    roles: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const save = (user) => {
    const token = Cookies.get("token");
    return axios.post(API_URL + "/add_new_user", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", User.name);
    formData.append("userName", User.userName);
    formData.append("email", User.email);
    formData.append("password", User.password);
    formData.append("roles", User.roles);

    save(formData)
      .then((res) => {
        setMsg("User Added Successfully!");
        setUser({
          name: "",
          userName: "",
          email: "",
          password: "",
          roles: "",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("token");
        }
        console.error("Error : ", error);
      });
  };

  return (
    <div>
      <HeaderComponent />
      <div className={styles.add_user}>
        <div>
          <Link to="/partner_page">partner page</Link>
          <h3>Новый пользователь</h3>
          <form onSubmit={(e) => createUser(e)}>
            <label>Имя сотрудника</label>
            <input
              type="text"
              name="name"
              value={User.name}
              onChange={handleChange}
            />
            <label>user name </label>
            <input
              type="text"
              name="userName"
              value={User.userName}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={User.email}
              onChange={handleChange}
            />
            <label>Пароль</label>
            <input
              type="text"
              name="password"
              value={User.password}
              onChange={handleChange}
            />
            <label>Роль пользователя</label>
            <select name="roles" value={User.roles} onChange={handleChange}>
              <option value="USER">Выберите из списка</option>
              <option value="USER">USER</option>
            </select>
            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUserComponent;
