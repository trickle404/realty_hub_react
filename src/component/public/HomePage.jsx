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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/public/home');
        setData(response.data);
        setDataResponse(true);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };

    if (!hasResponse) {
      fetchData();
    }

  }, [hasResponse, data]);

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
        <div className={styles.card_build}>
          {data.map(item => (
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
