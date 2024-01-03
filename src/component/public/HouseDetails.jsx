import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Image from '../Image';
import HeaderComponentPublic from './HeaderComponentPublic';
import styles from '../../styles/HouseDetails.module.css';
import squer from '../../content/logo/squer.png';
import rooms from '../../content/logo/rooms.png';
import bath from '../../content/logo/bath.png';
import location from '../../content/logo/location.png';
import view from '../../content/logo/view.png';
import beach from '../../content/logo/beach.png';
import state_build from '../../content/logo/state_build.png';
import LeafletMap from '../static/LeafletMap';
import AuthorsSignature from '../static/AuthorsSignature';

    const HouseDetails = () => {

        const { id } = useParams();
        const [houseData, setHouseData] = useState(null);
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {

            const fetchHouseData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8090/public/details_lot/${id}`);
                    setHouseData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchHouseData();

        }, [id]);

        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? houseData.imageList.length - 1 : prevIndex - 1));
        };
        
        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex === houseData.imageList.length - 1 ? 0 : prevIndex + 1));
        };

        const SentDataToBot = (e) => {
            console.log(e);
            e.preventDefault();
        }

        if (houseData !== null && houseData !== null) {
            return (
                <div className="all_component">
                    <div className={styles.up_container}>
                        <HeaderComponentPublic />
                        <div className={styles.house_detail}>
                            <div className={styles.carouselContainer}>
                                <button className={styles.prevButton} onClick={handlePrev}>&lt;</button>
                                <div className={styles.carousel}>
                                <ul className={styles.image_list} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                    {houseData.imageList.map((image, index) => (
                                    <li key={index} className={styles.carousel_item}>
                                        <Image image={image} />
                                    </li>
                                    ))}
                                </ul>
                                </div>
                                <button className={styles.nextButton} onClick={handleNext}>&gt;</button>
                            </div>
                        </div>
                        <div className={styles.price}>
                            <p>Price {houseData.price} EUR</p>
                        </div>
                    </div>
                    <div className={styles.information_container}>
                        <div className={`${styles.information_item} ${styles.squer}`}>
                            <span>Footage</span>
                            <img src={squer} alt="" />
                            <p>{houseData.square_footage} m2</p>
                        </div>
                        <div className={`${styles.information_item} ${styles.rooms}`}>
                            <span>Number of bedrooms</span>
                            <img src={rooms} alt="" />
                            <p>{houseData.count_of_bedrooms}</p>
                        </div>
                        <div className={`${styles.information_item} ${styles.bath}`}>
                            <span>Number of bath</span>
                            <img src={bath} alt="" />
                            <p>{houseData.count_of_bathrooms}</p>
                        </div>
                        <div className={`${styles.information_item} ${styles.location}`}>
                            <span>City</span>
                            <img src={location} alt="" />
                            <p>{houseData.city}</p>
                        </div>
                        <div className={`${styles.information_item} ${styles.view}`}>
                            <span>view</span>
                            <img src={view} alt="" />
                            <p>{houseData.view}</p>
                        </div>
                        <div className={`${styles.information_item} ${styles.beach}`}>
                            <span>To the beach</span>
                            <img src={beach} alt="" />
                            <p>{houseData.distance_to_beach} m</p>
                        </div>
                        <div className={`${styles.information_item} ${styles.state_build}`}>
                            <span>Floor</span>
                            <img src={state_build} alt="" />
                            <p>{houseData.number_of_stores}</p>
                        </div>
                    </div>
                    <div className={styles.h_location}>
                        <h1>Location</h1>
                    </div>
                    <div className={styles.location_container}>
                        <LeafletMap geo={houseData.geo}/>
                    </div>
                    <div className={styles.description_build_conatiner}>
                        <h1>Description of the object</h1>
                        <div className={styles.description_build_info}>
                            <p>{houseData.description}</p>
                        </div>
                    </div>
                    <div className={styles.form_for_call_container}>
                        <h1>Have questions about the object?</h1>
                        <p>Fill out the application and we will call you back</p>
                        <form onSubmit={(e) => SentDataToBot(e)} className={styles.form_call}>
                            <input type="text" name="first_name" placeholder="Name" value={null} className={styles.form_input}/>
                            <input type="text" name="phone" placeholder="phone" value={null} className={styles.form_input}/>
                            <input type="text" name="email" placeholder='email' value={null} className={styles.form_input}/>
                            <input type = "submit" value="Send" className={styles.form_submit_btn}/>
                        </form>
                    </div>
                    <AuthorsSignature/>
                </div>
            );
          }

        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    export default HouseDetails;