import styles from '../../styles/ClientList.module.css';

const BuildsListSmall = ({buildsList}) => {
    if(true) {
        console.log(buildsList);
    }
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
                                <p>Тип дома : {build.type}</p>
                                <p>Состояние : {build.type_of_dev}</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default BuildsListSmall;