import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Image from '../Image';
import styles from '../../styles/HomePageComponent.module.css'
import logo17 from '../../content/logo/17.png';
import logo18 from '../../content/logo/18.png';
import logo19 from '../../content/logo/19.png';
import logo_realty_hub from '../../content/logo/logo.svg';

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
          (!filters.houseType || (item.houseType && item.houseType.toLowerCase().includes(filters.houseType.toLowerCase().trim())))
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
        <div className={styles.header}>
          <div className={styles.links}>
            <a className = {`${styles.a} ${styles.a_header}`} href="/login">Авторизация</a>
          </div>
          <div className={styles.logo_header}>
            <img src={logo_realty_hub} alt="" />
          </div>
          <div className={styles.calls}>Закзать звонок</div>
        </div>
        <div className={styles.lang}>

        </div>
        <div className={styles.general_card_info}>
          <div className={styles.general_t_container}>
            <div className={`${styles.t_cover_wrapper} ${styles.t_valign_middle}`}>
              <div className={styles.t1065__wrapper}>
                <div className={`${styles.t1065__title} ${styles.t_title} ${styles.t_title_md }`}>
                  Ваш гид в мире недвижимости Черногории!
                </div>
                <div className={`${styles.t1065__descr} ${styles.t_descr} ${styles.t_descr_xl}`}>
                  Когда перемены точно к лучшему!
                </div>
                <div className={styles.t1065__itemwrapper}>
                  <div className={styles.t1065__row}>
                    <div className={`${styles.t1065__item} ${styles.t1065__item_flex}`}>
                      <div className={styles.t1065__imgwrapper}>
                        <img src={logo17} alt="" className={styles.t1065__img}/>
                      </div>
                      <div className={`${styles.t1065__item_text} ${styles.t_descr} ${styles.t_descr_md}`}>
                        <strong>Более 200 прямых объектов</strong>
                      </div>
                    </div>
                    <div className={`${styles.t1065__item} ${styles.t1065__item_flex}`}>
                      <div className={styles.t1065__imgwrapper}>
                        <img src={logo18} alt="" className={styles.t1065__img}/>
                      </div>
                      <div className={`${styles.t1065__item_text} ${styles.t_descr} ${styles.t_descr_md}`}>
                        <strong>Тщательная проверка</strong>
                      </div>
                    </div>
                    <div className={`${styles.t1065__item} ${styles.t1065__item_flex}`}>
                      <div className={styles.t1065__imgwrapper}>
                        <img src={logo19} alt="" className={styles.t1065__img}/>
                      </div>
                      <div className={`${styles.t1065__item_text} ${styles.t_descr} ${styles.t_descr_md}`}>
                        <strong>С вами рядом до новоселья!</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gen_object}>
          Все объекты
        </div>
        <div className={styles.filters}>
          <label>Город: 
            <select type="text" name="city" value={filters.city} onChange={handleFilterChange} > 
              <option value="">Выберите из списка</option>
              <option value="Бар">Бар</option>
              <option value="Будва">Будва</option>
              <option value="Херцег-Нови">Херцег-Нови</option>
              <option value="Котор">Котор</option>
              <option value="Никшич">Никшич</option>
              <option value="Петровац">Петровац</option>
              <option value="Подгорица">Подгорица</option>
              <option value="Прчань">Прчань</option>
              <option value="Рисан">Рисан</option>
              <option value="Сутоморе">Сутоморе</option>
              <option value="Свети-Стефан">Свети-Стефан</option>
              <option value="Тиват">Тиват</option>
              <option value="Улцинь">Улцинь</option>
              <option value="Жабляк">Жабляк</option>
              <option value="Колашин">Колашин</option>
              <option value="Баосичи">Баосичи</option>
              <option value="Донья-Костаница">Донья-Костаница</option>
              <option value="Доньи-Стой">Доньи-Стой</option>
              <option value="Игало">Игало</option>
              <option value="Плав">Плав</option>
              <option value="Радановичи">Радановичи</option>
              <option value="Свети Никола">Свети Никола</option>
              <option value="Андриевица">Андриевица</option>
              <option value="Бериславци">Бериславци</option>
              <option value="Бигово">Бигово</option>
              <option value="Биела">Биела</option>
              <option value="Биело-Поле">Биело-Поле</option>
              <option value="Даниловград">Даниловград</option>
              <option value="Добра-Вода">Добра-Вода</option>
              <option value="Каменари">Каменари</option>
              <option value="Мойковац">Мойковац</option>
              <option value="Пераст">Пераст</option>
              <option value="Утьеха">Утьеха</option>
              <option value="Цетине">Цетине</option>
              <option value="Чань">Чань</option>
            </select>
          </label>
          <label>
            Максимальная цена до:
            <select name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}>
              <option value="">Не выбрано</option>
              <option value="50000">50,000</option>
              <option value="100000">100,000</option>
            </select>
          </label>        
          <label>Тип дома: 
            <select type="text" name="houseType" value={filters.houseType} onChange={handleFilterChange}>
              <option value="">Выберите из списка</option>
              <option value="Студии">Студии</option>
              <option value="Квартиры">Квартиры</option>
              <option value="Дома">Дома</option>
              <option value="Виллы">Виллы</option>
              <option value="Участки">Участки</option>
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
          <a href="https://www.linkedin.com/in/dmitrii-afanasev-574a511aa/">Разработал Дмитрий Афанасьев</a>
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
