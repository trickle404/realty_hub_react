import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from '../../styles/Header.module.css'
import logo_realty_hub from '../../content/logo/Frame.png';

const HeaderComponent = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        Cookies.remove('token');
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo_header}>
                <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
            </div>
            <button onClick={handleLogOut}>Выход</button>
        </div>
    );

};

export default HeaderComponent;