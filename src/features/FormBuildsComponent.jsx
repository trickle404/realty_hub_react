import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderComponent from "../component/users/HeaderComponent";
import { Form, Input, InputNumber, Select, Button, message } from "antd";
import PhotoUploader from "./PhotoUploader";
import styles from "../styles/FormBuildsComponent.module.css";

const { Option } = Select;

const FormBuildsComponent = () => {
  const { id } = useParams();
  const API_URL = "https://realtyhubengine-production.up.railway.app/private";

  const [form] = Form.useForm();
  const [Builds, setBuilds] = useState({
    houseType: "",
    typeDeal: "",
    title: "",
    description: "",
    price: null,
    square_footage: null,
    count_of_bedrooms: null,
    count_of_bathrooms: null,
    city: "",
    view: "",
    distance_to_beach: "",
    floor: null,
    number_of_stores: null,
    type_of_dev: "",
    geo: "",
    manager: "",
    contact: "",
    hasLift: "",
    image: [],
  });

  const token = Cookies.get("token");

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) return; // Защита от undefined

    const fetchData = async () => {
      try {
        if (id) {
          const res = await axios.get(`${API_URL}/get_build/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setBuilds(res.data);
          form.setFieldsValue(res.data);
        }
      } catch (err) {
        message.error("Ошибка при загрузке данных");
      }
    };

    fetchData();
  }, [id, form, token]);
  const onFinish = async (values) => {
    try {
      const token = Cookies.get("token");
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      Builds.image.forEach((image, index) => {
        if (image instanceof File) {
          formData.append("image", image);
        }
      });

      if (id) {
        await axios.put(`${API_URL}/edit_build/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Постройка обновлена");
      } else {
        await axios.post(`${API_URL}/create_builds`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Постройка создана");
        form.resetFields();
        setBuilds({ ...Builds, image: [] });
      }
    } catch (err) {
      console.error(err);
      message.error("Ошибка при сохранении");
      const token = Cookies.get("token");
      console.log(token);
    }
  };

  const handleImageChange = (newImages) => {
    setBuilds((prev) => ({ ...prev, image: newImages }));
  };

  const beachDistances = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001,
  ];

  const cities = [
    "Bar",
    "Budva",
    "Herceg Novi",
    "Kotor",
    "Niksic",
    "Petrovac",
    "Podgorica",
    "Prcanj",
    "Risan",
    "Sutomore",
    "Sveti Stefan",
    "Tivat",
    "Ulcinj",
    "Zabljak",
    "Kolasin",
    "Baosichi",
    "Donja Kostanjica",
    "Donyi-Stoy",
    "Igalo",
    "Plav",
    "Radanovics",
    "Sveti Nikola",
    "Andrijevitsa",
    "Berislavtsi",
    "Bigovo",
    "Biela",
    "Bijelo Polje",
    "Danilovgrad",
    "Dobra-Voda",
    "Kamenari",
    "Mojkovac",
    "Perast",
    "Utjeha",
    "Cetinje",
    "Chan",
  ];

  return (
    <div className={styles.formContainer}>
      <HeaderComponent />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={Builds}
        style={{ width: 400 }}
      >
        <Form.Item
          name="houseType"
          label="Тип постройки"
          rules={[{ required: true }]}
        >
          <Select placeholder="Выберите тип">
            <Option value="Студии">Студии</Option>
            <Option value="Квартиры">Квартиры</Option>
            <Option value="Дома">Дома</Option>
            <Option value="Виллы">Виллы</Option>
            <Option value="Участки">Участки</Option>
            <Option value="Коммерчиская">Коммерчиская</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="typeDeal"
          label="Тип сделки"
          rules={[{ required: true }]}
        >
          <Select placeholder="Выберите тип">
            <Option value="Аренда">Аренда</Option>
            <Option value="Продажа">Продажа</Option>
          </Select>
        </Form.Item>

        <Form.Item name="title" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name="price" label="Цена">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="square_footage" label="Метраж">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="count_of_bedrooms" label="Спален кол-во">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="count_of_bathrooms" label="Санузлов кол-во">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="city" label="Город">
          <Select showSearch placeholder="Выберите город">
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="view" label="Вид">
          <Select>
            <Option value="море">Море</Option>
            <Option value="горы">Горы</Option>
            <Option value="город">Город</Option>
          </Select>
        </Form.Item>

        <Form.Item name="distance_to_beach" label="До пляжа">
          <Select>
            {beachDistances.map((d) => (
              <Option key={d} value={d.toString()}>
                {d >= 1000 ? "1 км +" : `${d} м`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="floor" label="Этаж">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="number_of_stores" label="Этажность">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="type_of_dev" label="Тип застройки">
          <Select>
            <Option value="Новостройка">Новостройка</Option>
            <Option value="Вторичная">Вторичная</Option>
          </Select>
        </Form.Item>

        <Form.Item name="hasLift" label="Лифт">
          <Select>
            <Option value="true">Есть лифт</Option>
            <Option value="false">Нет лифта</Option>
          </Select>
        </Form.Item>

        <Form.Item name="geo" label="Геолокация">
          <Input placeholder="Например: 42.435338, 19.260000" />
        </Form.Item>

        <Form.Item label="Фотографии">
          <PhotoUploader
            onFilesUpload={handleImageChange}
            imageList={Builds.image}
            onFilesChange={handleImageChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormBuildsComponent;
