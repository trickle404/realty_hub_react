import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Image from '../Image';
import styles from '../../styles/HomePageComponent.module.css'
import HeaderHome from '../static/HeaderHome';


const HomePage = () => {
  const [data, setData] = useState(null);
  const [hasResponse, setDataResponse] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ city: '', maxPrice: '', houseType: '' });
  const shouldDisplayFilteredData = Object.values(filters).some(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/public/home');
        setData(response.data);
        setDataResponse(true);
        console.log(response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    if (!hasResponse) {
      fetchData();
    }
  }, [hasResponse, data]);

  useEffect(() => {
    const filterData = () => {
      if (data) {
        const filteredResult = data.filter((item) => (
          item.city.toLowerCase().includes(filters.city.toLowerCase().trim()) &&
          item.price <= parseFloat(filters.maxPrice || Infinity) &&
          (!filters.houseType || (item.houseType && item.houseType.toLowerCase().includes(filters.houseType.toLowerCase().trim()))) &&
          (!filters.typeDeal || (item.typeDeal && item.typeDeal.toLowerCase().includes(filters.typeDeal.toLowerCase().trim())))
        ));
  
        setFilteredData(filteredResult);
      }
    };
  
    filterData();
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  if (data !== null && data !== undefined) {
    return (
      <div>
        <HeaderHome/>
        <div className={styles.filters}>
          <label>City: 
            <select type="text" name="city" value={filters.city} onChange={handleFilterChange} > 
              <option value="">Select from the list</option>
              <option value="Бар">Bar</option>
              <option value="Будва">Budva</option>
              <option value="Херцег-Нови">Herceg Novi</option>
              <option value="Котор">Kotor</option>
              <option value="Никшич">Niksic</option>
              <option value="Петровац">Petrovac</option>
              <option value="Подгорица">Podgorica</option>
              <option value="Прчань">Prcanj</option>
              <option value="Рисан">Risan</option>
              <option value="Сутоморе">Sutomore</option>
              <option value="Свети-Стефан">Sveti Stefan</option>
              <option value="Тиват">Tivat</option>
              <option value="Улцинь">Ulcinj</option>
              <option value="Жабляк">Zabljak</option>
              <option value="Колашин">Kolasin</option>
              <option value="Баосичи">Baosichi</option>
              <option value="Донья-Костаница">Donja Kostanjica</option>
              <option value="Доньи-Стой">Donyi-Stoy</option>
              <option value="Игало">Igalo</option>
              <option value="Плав">Plav</option>
              <option value="Радановичи">Radanovics</option>
              <option value="Свети Никола">Sveti Nikola</option>
              <option value="Андриевица">Andrijevitsa</option>
              <option value="Бериславци">Berislavtsi</option>
              <option value="Бигово">Bigovo</option>
              <option value="Биела">Biela</option>
              <option value="Биело-Поле">Bijelo Polje</option>
              <option value="Даниловград">Danilovgrad</option>
              <option value="Добра-Вода">Dobra-Voda</option>
              <option value="Каменари">Kamenari</option>
              <option value="Мойковац">Mojkovac</option>
              <option value="Пераст">Perast</option>
              <option value="Утьеха">Utjeha</option>
              <option value="Цетине">Cetinje</option>
              <option value="Чань">Chan</option>
            </select>
          </label>
          <label>
            Max price:
            <select name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}>
              <option value="">Select from the list</option>
              <option value="50000">50,000</option>
              <option value="100000">100,000</option>
            </select>
          </label>        
          <label>Type of build: 
            <select type="text" name="houseType" value={filters.houseType} onChange={handleFilterChange}>
              <option value="">Select from the list</option>
              <option value="Студии">Studio</option>
              <option value="Квартиры">Apartment</option>
              <option value="Дома">House</option>
              <option value="Виллы">Villas</option>
              <option value="Участки">Piece of land</option>
            </select>
          </label>
          <label>Chapter: 
            <select type="text" name="typeDeal" value={filters.typeDeal} onChange={handleFilterChange}>
              <option value="">Select from the list</option>
              <option value="Аренда">rent</option>
              <option value="Продажа">sale</option>
            </select>
          </label>
        </div>
        <div className={styles.card_build}>
          {(shouldDisplayFilteredData ? filteredData : data).map(item => (
              <div key={item.id} className={styles.card}>
                <div className={styles.imageList}>
                    {item.imageList.map((image, index) => (
                      <Image key={index} image={image}/>
                    ))} 
                </div>
                <div className={styles.cardContent}>
                  <p>{item.title}</p>
                  <p>{item.price} EUR</p>
                </div>
                <div>
                  <Link className={styles.linkDetails} to={`/details/${item.id}`}>Подробнее</Link>
                </div>
              </div>
            ))}
        </div>
        <br />
        <div className={styles.footer}>
          <a href="https://www.linkedin.com/in/dmitrii-afanasev-574a511aa/">Develop by Dmitrii Afanasev</a>
        </div>
      </div>
    );
  }

  return (
    <div className='general'>
      <div>
        <p>Loading...</p>
      </div>
    </div>);
};

export default HomePage;
