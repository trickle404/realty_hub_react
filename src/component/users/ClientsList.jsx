import styles from '../../styles/ClientList.module.css';

const ClientsList = ({ clientList, onDeleteClient }) => {

    return(
        <div>
            <div className={styles.clients_container}>
                {clientList.map(client => (
                    <div key={client.id} className={styles.client_card}>
                        <p>Имя : {client.firstName}</p>                        
                        <p>Фамилия : {client.lastName}</p>                        
                        <p>Телефон : {client.numberPhone}</p>                    
                        <p>Бюджет : {client.income} EUR</p>                        
                        <p>Тип сделки : {client.type}</p>
                        <p>Работает с менеджером : {client.managerName}</p>
                        <div className={styles.change_button_build}>
                            <button onClick={() => onDeleteClient(client.id)}>Удалить клиента</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientsList;