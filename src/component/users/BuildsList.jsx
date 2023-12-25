import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import Image from '../Image';
import Cookies from "js-cookie";
import styles from '../../styles/BuildsList.module.css';
import logo_realty_hub from '../../content/logo/Frame.png';



const BuildsList = () => {
    const [data, setData] = useState(null);
    const [hasResponse, setDataResponse] = useState(false);
    const [editBuildId, setEditBuildId] = useState(null);
    const API_URL = "http://localhost:8090/private";
    

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

    const handleIditClick = (buildId) => {
        setEditBuildId(buildId);
    }

    const handleDeleteByIdClick = (buildId) => {
        try {
            const token = Cookies.get('token');
            axios.get(API_URL+"/delete_build/"+buildId,  {
                headers : {
                    'Authorization': `Bearer ${token}` 
                }
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }
  
  
    if (data !== null && data !== undefined) {
      return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo_header}>
                    <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
                </div>
            </div>
            <div className={styles.data_builds_container}>
            {data.map(item => (
              <div key={item.id} className={styles.data_builds_block}>
                <Link to={`/details/${item.id}`}>
                  {item.title}
                </Link>
                <div>
                    {item.imageList.map((image, index) => (
                      <Image key={index} image={image}/>
                    ))} 
                </div>
                <br />
                <div className={styles.change_button_build}>
                  <button onClick={() => handleIditClick(item.id)}>Изменить</button>
                  <button onClick={() => handleDeleteByIdClick(item.id)}>Удалить объект</button>
                </div>
              </div>
            ))}
            {editBuildId && <Navigate to = {`/create_build/${editBuildId}`}/>}
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
}

export default BuildsList;