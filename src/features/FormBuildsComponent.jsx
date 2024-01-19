/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import styles from '../styles/FormBuilds.module.css';
import logo_realty_hub from '../content/logo/Frame.png';
import HeaderComponent from '../component/users/HeaderComponent';
import { useDropzone } from 'react-dropzone';
import PhotoUploader from "./PhotoUploader";


const FormBuildsComponent = () => {

    const { id } = useParams();

    const[msg, setMsg] = useState("");

    const API_URL = "http://localhost:8090/private";
    
    const [Builds, setBuilds] = useState({
        houseType : "",
        typeDeal : "",
        title : "",
        description : "",
        price : "",
        square_footage : "",
        count_of_bedrooms : "",
        count_of_bathrooms : "",
        city : "",
        view : "",
        distance_to_beach : "",
        floor : "",
        number_of_stores : "",
        type_of_dev : "",
        geo : "",
        manager : "",
        contact : "",
        image : []
    });

    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
    
                if (id) {
                    const buildResponse = await axios.get(`${API_URL}/get_build/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    const buildData = buildResponse.data;
                    if (buildData) {
                        setBuilds({
                            houseType: buildData.houseType || "",
                            typeDeal: buildData.typeDeal || "",
                            title: buildData.title || "",
                            description: buildData.description || "",
                            price: buildData.price || "",
                            square_footage: buildData.square_footage || "",
                            count_of_bedrooms: buildData.count_of_bedrooms || "",
                            count_of_bathrooms: buildData.count_of_bathrooms || "",
                            city: buildData.city || "",
                            view: buildData.view || "",
                            distance_to_beach: buildData.distance_to_beach || "",
                            floor: buildData.floor || "",
                            number_of_stores: buildData.number_of_stores || "",
                            type_of_dev: buildData.type_of_dev || "",
                            geo: buildData.geo || "",
                            manager: buildData.manager || "",
                            contact: buildData.contact || "",
                            image: buildData.imageList || []
                        });
                    } else {
                        console.error("buildData.data is undefined or null");
                    }
                }
    
                const usersResponse = await axios.get(`${API_URL}/get_all_users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const usersData = usersResponse.data;
                setManagers(usersData);
    
                setLoading(false);
            } catch (error) {
                setError(error.message || "Something went wrong?");
                setLoading(false);
            }
        };
    
        fetchData();
    }, [id]);

    const handleChange = e => {
        const {name , value} = e.target;
        setBuilds({...Builds, [name]:value})
    }

    const handleImageChange = (newImageList) => {
        // Проверяем, действительно ли есть изменения
        if (JSON.stringify(newImageList) !== JSON.stringify(Builds.image)) {
          setBuilds((prevBuilds) => ({ ...prevBuilds, image: newImageList }));
        }
    };

    const onFilesChange = (newImageList) => {
        setBuilds((prevBuilds) => ({ ...prevBuilds, image: newImageList }));
    };


    const handleRemoveImage = (index) => {
        setBuilds((prevBuilds) => {
            const updatedImageArray = [...prevBuilds.image];
            updatedImageArray.splice(index, 1);
            return { ...prevBuilds, image: updatedImageArray };
        });
    };

    const CreateBuilds = async (e) => {
        e.preventDefault();
    
        try {
            const token = Cookies.get('token');
            const formData = new FormData();
            formData.append("houseType", Builds.houseType);
            formData.append("typeDeal", Builds.typeDeal);
            formData.append("title", Builds.title);
            formData.append("description", Builds.description);
            formData.append("price", Builds.price);
            formData.append("square_footage", Builds.square_footage);
            formData.append("count_of_bedrooms", Builds.count_of_bedrooms);
            formData.append("count_of_bathrooms", Builds.count_of_bathrooms);
            formData.append("city", Builds.city);
            formData.append("view", Builds.view);
            formData.append("distance_to_beach", Builds.distance_to_beach);
            formData.append("floor", Builds.floor);
            formData.append("number_of_stores", Builds.number_of_stores);
            formData.append("type_of_dev", Builds.type_of_dev);
            formData.append("geo", Builds.geo);
            formData.append("manager", Builds.manager);
            formData.append("contact", Builds.contact);
        
            if (Builds.image.length > 0) {
                Builds.image.forEach((image, index) => {
                    if (image.bytes) {
                        // Если это изображение из респонса, добавляем его в форму
                        const byteArray = Uint8Array.from(atob(image.bytes), c => c.charCodeAt(0));
                        const blob = new Blob([byteArray], { type: 'image/png' });
                        formData.append(`image`, blob, `image_${index}.png`);
                    } else if (image instanceof File) {
                        // Если это файл, добавляем его в форму
                        formData.append(`image`, image);
                    }
                });
            }
    
            if (id) {
                await axios.put(`${API_URL}/edit_build/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                await axios.post(API_URL + "/create_builds", formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            setMsg("Build Added Successfully");
            setBuilds({
                houseType: "",
                typeDeal: "",
                title: "",
                description: "",
                price: "",
                square_footage: "",
                count_of_bedrooms: "",
                count_of_bathrooms: "",
                city: "",
                view: "",
                distance_to_beach: "",
                floor: "",
                number_of_stores: "",
                type_of_dev: "",
                geo: "",
                manager: "",
                contact: "",
                image: [],
            });
        } catch (error) {
            console.error(error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleImageChange,
        accept: "image/*",
        multiple: true
    });

    return(
        <div>
            <HeaderComponent/>
            <div className={styles.from_container}>
                <Link to ="/partner_page" className={styles.link}>partner page</Link>
                <form onSubmit={(e) => CreateBuilds(e)}>
                    <label className={styles.form_label}>
                        Тип постройки
                        <br/>
                        <select name="houseType" value={Builds.houseType} onChange={handleChange} className={styles.form_select}>
                            <option value="">Выберите из списка</option>
                            <option value="Студии">Студии</option>
                            <option value="Квартиры">Квартиры</option>
                            <option value="Дома">Дома</option>
                            <option value="Виллы">Виллы</option>
                            <option value="Участки">Участки</option>
                        </select>
                    </label>
                    <br/>
                    <label className={styles.form_label}>
                        Тип сделки
                        <br />
                        <select name="typeDeal" value={Builds.typeDeal} onChange={handleChange} className={styles.form_select}>
                        <option value="">Выберите из списка</option>
                            <option value="Аренда">Аренда</option>
                            <option value="Продажа">Продажа</option>
                        </select>
                    </label>
                    <br />
                    <label className={styles.form_label}>Название</label>
                    <input type = "text" name="title" value={Builds.title} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Описание</label>
                    <input type = "text" name="description" value={Builds.description} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Цена</label>
                    <input type = "number" name = "price" value={Builds.price} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Метраж</label>
                    <input type = "number" name = "square_footage" value={Builds.square_footage} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Спален кол-во</label>
                    <input type = "number" name="count_of_bedrooms" value={Builds.count_of_bedrooms} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Санузлов кол-во</label>
                    <input type = "number" name="count_of_bathrooms" value={Builds.count_of_bathrooms} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Город
                        <br/>
                        <select name="city" value={Builds.city} onChange={handleChange} className={styles.form_select}>
                        <option value="unknown">Выберите из списка</option>
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
                    <br/>
                    <label className={styles.form_label}>Вид</label>
                    <input type = "text" name="view" value={Builds.view} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>До пляжа</label>
                        <br />
                        <select name="distance_to_beach" value={Builds.distance_to_beach} onChange={handleChange} className={styles.form_select} placeholder="10 минут">
                        <option value="unknown">Выберите из списка</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        </select>
                    <br/>
                    <label className={styles.form_label}>Этаж</label>
                    <input type = "number" name="floor" value={Builds.floor} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Этажность</label>
                    <input type = "number" name="number_of_stores" value={Builds.number_of_stores} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Тип застройки
                        <br/>
                        <select name="type_of_dev" value={Builds.type_of_dev} onChange={handleChange} className={styles.form_select}>
                            <option value="unknown">Выберите из списка</option>
                            <option value="Новостройка">Новостройка</option>
                            <option value="Вторичная">Вторичная</option>
                            <option value="Коммерчиская">Коммерчиская</option>
                        </select>
                    </label>
                    <br/>
                    <label className={styles.form_label}>Геолокация</label>
                    <input type = "text" name="geo" value={Builds.geo} onChange={handleChange} placeholder="поставьте координаты : 42.435338, 19.260000" className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Фотографии</label>
                    <PhotoUploader onFilesUpload={handleImageChange} imageList={Builds.image} onFilesChange={onFilesChange} />
                    <div className={styles.image_preview_container}>
                        {Builds.image.map((img, index) => (
                            <div key={index} className={styles.image_preview}>
                                <img src={img.bytes ? `data:image/png;base64,${img.bytes}` : URL.createObjectURL(new Blob([img], { type: 'image/jpeg' }))} alt={`Preview ${index}`} />
                                <button type="button" onClick={() => handleRemoveImage(index)}>Удалить</button>
                            </div>
                        ))}
                    </div>
                    <br/>
                    <input type = "submit" value="Save" className={styles.form_submit_btn}/>
                </form>
            </div>
        </div>
    )
}

export default FormBuildsComponent;
