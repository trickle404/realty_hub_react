import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import style from '../styles/LoginForm.module.css';
import logo_realty_hub from '../content/logo/Frame.png';
import Cookies from 'js-cookie';

const LoginComponent = () => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8090/public/generate_token', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        Cookies.set('token', response.data);
        navigate('/partner_page', { state: { username: formData.username } });
      } catch (error) {
        console.error('Ошибка при входе в систему:', error);
      }
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
        <div>
            <div className={style.header}>
                <div className={style.logo_header}>
                  <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
                </div>
            </div>
            <div className={style.container}>
                <div className={style.form_container}>
                    <h2 className={style.form_title}>Форма входа для сотрудников</h2>
                    <form onSubmit={handleSubmit}>
                        <label className={style.form_label}>
                        Имя пользователя или Email:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={style.form_input}
                        />
                        </label>
                        <br />
                        <label className={style.form_label}>
                        Пароль:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={style.form_input}
                        />
                        </label>
                        <br />
                        <button type="submit" className={style.form_button}>Войти</button>
                        <a href="/" className={style.back_link}>back</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;
