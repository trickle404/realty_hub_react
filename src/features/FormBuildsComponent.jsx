/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import styles from '../styles/FormBuilds.module.css';
import logo_realty_hub from '../content/logo/Frame.png';


const FormBuildsComponent = () => {

    const { id } = useParams();

    const[msg, setMsg] = useState("");

    const API_URL = "http://localhost:8090/private";
    
    const [Builds, setBuilds] = useState({
        type : "",
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
    
                // Получить данные конкретного дома, если есть id
                if (id) {
                    const buildResponse = await axios.get(`${API_URL}/get_build/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const buildData = buildResponse.data;
                    setBuilds({
                        type : buildData.data.type || "",
                        title : buildData.data.title || "",
                        description : buildData.data.description || "",
                        price : buildData.data.price || "",
                        square_footage : buildData.data.square_footage || "",
                        count_of_bedrooms : buildData.data.count_of_bedrooms || "",
                        count_of_bathrooms : buildData.data.count_of_bathrooms || "",
                        city : buildData.data.city || "",
                        view : buildData.data.view || "",
                        distance_to_beach : buildData.data.distance_to_beach || "",
                        floor : buildData.data.floor || "",
                        number_of_stores : buildData.data.number_of_stores || "",
                        type_of_dev : buildData.data.type_of_dev || "",
                        geo : buildData.data.geo || "",
                        manager : buildData.data.manager || "",
                        contact : buildData.data.contact || "",
                        image : buildData.data.image || []
                    });
                }
    
                // Получить список всех пользователей
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

    const handleImageChange = (e) => {
        const image = e.target.files;
        setBuilds({ ...Builds, image: [...Builds.image, ...image] });
    };

    const save  = async (builds) => {
        const token = Cookies.get('token');
        if(id) {
            return axios.put(API_URL + "/edit_build/" + id, builds, {
                headers : {
                    'Authorization': `Bearer ${token}` 
                }
            });
        } else {

            if (Builds.image.length === 0) {
                const defaultImageBlob = await fetch(logo_realty_hub).then(r => r.blob());
                builds.append('image', defaultImageBlob);
            }
            return axios.post(API_URL + "/create_builds", builds, {
                headers : {
                    'Authorization': `Bearer ${token}` 
                }
            });
        }
    }

    const CreateBuilds = (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append("type", Builds.type);
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
        Builds.image.forEach((image, index) => {
            formData.append(`image`, image);
        });
      
        save(formData)
          .then((res) => {
            setMsg("Build Added Successfully");
            setBuilds({
              type: "",
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
          })
          .catch((error) => {
            console.error("Error:", msg);
          });
      };

    return(
        <div>
            <div className={styles.header}>
                <div className={styles.logo_header}>
                  <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
                </div>
            </div>
            <div className={styles.from_container}>
                <Link to ="/partner_page" className={styles.link}>partner page</Link>
                <form onSubmit={(e) => CreateBuilds(e)}>
                    <label className={styles.form_label}>
                        Тип постройки
                        <br/>
                        <select name="type" value={Builds.type} onChange={handleChange} className={styles.form_select}>
                            <option value="unknown">Выберите из списка</option>
                            <option value="Студии">Студии</option>
                            <option value="Квартиры">Квартиры</option>
                            <option value="Дома">Дома</option>
                            <option value="Виллы">Виллы</option>
                            <option value="Участки">Участки</option>
                        </select>
                    </label>
                    <br/>
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
                    <br/>
                    <label className={styles.form_label}>Вид</label>
                    <input type = "text" name="view" value={Builds.view} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>До пляжа</label>
                    <input type = "number" name="distance_to_beach" value={Builds.distance_to_beach} onChange={handleChange} className={styles.form_input}/>
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
                    <input type = "text" name="geo" value={Builds.geo} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Менеджер</label>
                    <select name="manager" value={Builds.manager} onChange={handleChange} className={styles.form_select}>
                    <option value="">Select from the list</option>
                        {managers.map(manager => (
                            <option key={manager.id} value={manager.id}>
                                {manager.name}
                            </option>
                        ))}
                     </select>
                    <br/>
                    <label className={styles.form_label}>Контакты</label>
                    <input type = "text" name="contact" value={Builds.contact} onChange={handleChange} className={styles.form_input}/>
                    <br/>
                    <label className={styles.form_label}>Photo</label>
                    <input className={styles.form_file_input} type = "file" name="image" onChange={handleImageChange} accept="image/*" multiple/>
                    <br/>
                    <input type = "submit" value="Save" className={styles.form_submit_btn}/>
                </form>
            </div>
        </div>
    )
}

export default FormBuildsComponent;