import { Link } from 'react-router-dom';
import styles from '../../styles/Header.module.css'
import logo_realty_hub from '../../content/logo/Frame.png';

const HeaderComponentPublic = () => {


    return (
        <div className={styles.header}>
            <div className={styles.logo_header}>
                <Link to="/"><img src={logo_realty_hub} alt="" /></Link>
            </div>
        </div>
    );

};

export default HeaderComponentPublic;