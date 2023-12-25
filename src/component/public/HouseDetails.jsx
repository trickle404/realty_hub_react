import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Image from '../Image';

    const HouseDetails = () => {

        const { id } = useParams();
        const [houseData, setHouseData] = useState(null);

        useEffect(() => {

            const fetchHouseData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8090/public/details_lot/${id}`)
                    setHouseData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchHouseData();

        }, [id]);

        if(houseData !== null && houseData !== null) {
            return(
                <div className='house_detail'>
                    <h3>{houseData.title}</h3>
                    <br />
                    <p>{houseData.type}</p>
                    <br />
                    <p>{houseData.price}</p>
                    <br />
                    <p>{houseData.city}</p>
                    <br />
                    <p>{houseData.manager}</p>
                    <div className='house_detail_image'>
                       <Image build = {houseData.imageList}/>
                    </div>
                    <a href="/">back</a>
                </div>
            )
        }

        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    export default HouseDetails;