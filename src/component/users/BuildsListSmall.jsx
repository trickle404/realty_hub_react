import styles from '../../styles/ClientList.module.css';
import { Link } from "react-router-dom";

const BuildsListSmall = ({buildsList}) => {
    console.log(buildsList);
    return (
        <div>
            <div className={styles.clients_container}>
                {
                    buildsList.map(
                        build => (
                            <div key={build.id} className={styles.client_card}>
                                <p>Название : {build.title}</p>
                                <p>Город : {build.city}</p>
                                <p>Цена : {build.price}</p>
                                <p>Вид : {build.view}</p>
                                <p>Тип дома : {build.houseType}</p>
                                <p>Состояние : {build.type_of_dev}</p>
                                <p>Тип сделки : {build.typeDeal}</p>
                                <Link className={styles.linkDetails} to={`/details/${build.id}`}>Подробнее</Link>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default BuildsListSmall;