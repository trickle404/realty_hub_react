import React from "react";
import styles from '../styles/Image.module.css';

const Image = ({ key, image }) => {
  if (image !== null && image !== undefined) {
    return (
      <div className={styles.image_container}>
        <img
          id={key}
          src={"data:image/png;base64," + image.bytes}
          alt={image.name}
          className={styles.image}
        />
      </div>
    );
  }
};

export default Image;
