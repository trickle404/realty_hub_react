import React from 'react';
import styles from '../../styles/Modal.module.css';

const Modal = ({ show, onClose, children }) => {

    const handleContainerClick = (e) => {
        // Предотвращаем всплытие события, чтобы оно не достигло родительских элементов
        e.stopPropagation();
    };

    return (
        <>
            {show && (
                <div className={styles.overlay} onClick={onClose}>
                    <div className={styles.modal} onClick={handleContainerClick}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
