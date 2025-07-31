/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image";
import styles from "../../styles/HomePageComponent.module.css";
import HeaderHome from "../static/HeaderHome";
import AuthorsSignature from "../static/AuthorsSignature";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [hasResponse, setDataResponse] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    maxPrice: "",
    houseType: "",
    typeDev: "",
    distanceToSea: "",
    view: "",
    hasLift: "",
  });
  const shouldDisplayFilteredData = Object.values(filters).some(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://realtyhubengine-production.up.railway.app/public/home",
        );
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

  useEffect(() => {
    const filterData = () => {
      if (data) {
        const filteredResult = data.filter(
          (item) =>
            item.city
              .toLowerCase()
              .includes(filters.city.toLowerCase().trim()) &&
            item.price <= parseFloat(filters.maxPrice || Infinity) &&
            (!filters.houseType ||
              (item.houseType &&
                item.houseType
                  .toLowerCase()
                  .includes(filters.houseType.toLowerCase().trim()))) &&
            (!filters.typeDeal ||
              (item.typeDeal &&
                item.typeDeal
                  .toLowerCase()
                  .includes(filters.typeDeal.toLowerCase().trim()))) &&
            (!filters.typeDev ||
              (item.type_of_dev &&
                item.type_of_dev
                  .toLowerCase()
                  .includes(filters.typeDev.toLowerCase().trim()))) &&
            item.distance_to_beach <=
              parseFloat(filters.distanceToSea || Infinity) &&
            (!filters.view ||
              (item.view &&
                item.view
                  .toLowerCase()
                  .includes(filters.view.toLowerCase().trim()))) &&
            (filters.hasLift === "" || (item.hasLift && filters.hasLift)),
        );

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
        <HeaderHome />
        <div className={styles.filters}>
          <label>
            City:
            <select
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="Bar">Bar</option>
              <option value="Budva">Budva</option>
              <option value="Herceg Novi">Herceg Novi</option>
              <option value="Kotor">Kotor</option>
              <option value="Niksic">Niksic</option>
              <option value="Petrovac">Petrovac</option>
              <option value="Podgorica">Podgorica</option>
              <option value="Prcanj">Prcanj</option>
              <option value="Risan">Risan</option>
              <option value="Sutomore">Sutomore</option>
              <option value="Sveti Stefan">Sveti Stefan</option>
              <option value="Tivat">Tivat</option>
              <option value="Ulcinj">Ulcinj</option>
              <option value="Zabljak">Zabljak</option>
              <option value="Kolasin">Kolasin</option>
              <option value="Baosichi">Baosichi</option>
              <option value="Donja Kostanjica">Donja Kostanjica</option>
              <option value="Donyi-Stoy">Donyi-Stoy</option>
              <option value="Igalo">Igalo</option>
              <option value="Plav">Plav</option>
              <option value="Radanovics">Radanovics</option>
              <option value="Sveti Nikola">Sveti Nikola</option>
              <option value="Andrijevitsa">Andrijevitsa</option>
              <option value="Berislavtsi">Berislavtsi</option>
              <option value="Bigovo">Bigovo</option>
              <option value="Biela">Biela</option>
              <option value="Bijelo Polje">Bijelo Polje</option>
              <option value="Danilovgrad">Danilovgrad</option>
              <option value="Dobra-Voda">Dobra-Voda</option>
              <option value="Kamenari">Kamenari</option>
              <option value="Mojkovac">Mojkovac</option>
              <option value="Perast">Perast</option>
              <option value="Utjeha">Utjeha</option>
              <option value="Cetinje">Cetinje</option>
              <option value="Chan">Chan</option>
            </select>
          </label>
          <label>
            Max price:
            <select
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="50000">50,000</option>
              <option value="100000">100,000</option>
            </select>
          </label>
          <label>
            Type of build:
            <select
              type="text"
              name="houseType"
              value={filters.houseType}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="Студии">Studio Apartment</option>
              <option value="Квартиры">Apartment</option>
              <option value="Дома">House</option>
              <option value="Виллы">Villas</option>
              <option value="Участки">Piece of land</option>
              <option value="Коммерчиская">Office Spaces</option>
            </select>
          </label>
          <label>
            Chapter:
            <select
              type="text"
              name="typeDeal"
              value={filters.typeDeal}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="Аренда">rent</option>
              <option value="Продажа">sale</option>
            </select>
          </label>
          <label>
            Type of dev:
            <select
              type="text"
              name="typeDev"
              value={filters.typeDev}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="Новостройка">New Developments</option>
              <option value="Вторичная">Resale Properties</option>
            </select>
          </label>
          <label>
            Distance to the sea:
            <select
              type="text"
              name="distanceToSea"
              value={filters.distanceToSea}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="100">100 m</option>
              <option value="200">200 m</option>
              <option value="300">300 m</option>
              <option value="400">400 m</option>
              <option value="500">500 m</option>
              <option value="600">600 m</option>
              <option value="700">700 m</option>
              <option value="800">800 m</option>
              <option value="900">900 m</option>
              <option value="1000">1 km</option>
              <option value="1001">1 km +</option>
            </select>
          </label>
          <label>
            View:
            <select
              type="text"
              name="view"
              value={filters.view}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="море">Sea</option>
              <option value="горы">Mount</option>
              <option value="город">City</option>
            </select>
          </label>
          <label>
            Lift:
            <select
              type="text"
              name="hasLift"
              value={filters.hasLift}
              onChange={handleFilterChange}
            >
              <option value="">Select from the list</option>
              <option value="true">Yes</option>
            </select>
          </label>
        </div>
        <div className={styles.card_build}>
          {(shouldDisplayFilteredData ? filteredData : data).map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.imageList}>
                {item.imageList.map((image, index) => {
                  if (image.previewImage) {
                    return <Image key={index} image={image} />;
                  }
                })}
              </div>
              <div className={styles.cardContent}>
                <p>{item.title}</p>
                <p>{item.price} EUR</p>
              </div>
              <div>
                <Link className={styles.linkDetails} to={`/details/${item.id}`}>
                  More details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <br />
        <AuthorsSignature />
      </div>
    );
  }
};

export default HomePage;
