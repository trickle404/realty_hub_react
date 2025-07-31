import React, { useState } from "react";
import Modal from "../static/Modal";
import axios from "axios";
import styles from "../../styles/HomePageComponent.module.css";
import logo17 from "../../content/logo/17.png";
import logo18 from "../../content/logo/18.png";
import logo19 from "../../content/logo/19.png";
import logo_realty_hub from "../../content/logo/logo.svg";

const HeaderHome = () => {
  const [showForm, setShowForm] = useState(false);

  const [formDataClient, setFormDataClient] = useState({
    first_name: "",
    phone: "",
    email: "",
  });

  const SentDataToBot = async (e) => {
    e.preventDefault();

    if (!formDataClient.first_name || !formDataClient.phone) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const currentUrl = window.location.href;
      await axios.post("https://127.0.0.1:5000/request_call", {
        ...formDataClient,
        currentUrl,
      });
      alert("Done");
      setFormDataClient({
        first_name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleInputChange = (e) => {
    setFormDataClient({
      ...formDataClient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.links}>
          <a className={`${styles.a} ${styles.a_header}`} href="/login">
            Sign in
          </a>
        </div>
        <div className={styles.logo_header}>
          <img src={logo_realty_hub} alt="" />
        </div>
        <div className={styles.calls} onClick={() => setShowForm(true)}>
          Request a call
        </div>
      </div>
      <div className={styles.lang}></div>
      <div className={styles.general_card_info}>
        <div className={styles.general_t_container}>
          <div
            className={`${styles.t_cover_wrapper} ${styles.t_valign_middle}`}
          >
            <div className={styles.t1065__wrapper}>
              <div
                className={`${styles.t1065__title} ${styles.t_title} ${styles.t_title_md}`}
              >
                Your guide in the world of real estate in Montenegro!
              </div>
              <div
                className={`${styles.t1065__descr} ${styles.t_descr} ${styles.t_descr_xl}`}
              >
                When change is definitely for the better!
              </div>
              <div className={styles.t1065__itemwrapper}>
                <div className={styles.t1065__row}>
                  <div
                    className={`${styles.t1065__item} ${styles.t1065__item_flex}`}
                  >
                    <div className={styles.t1065__imgwrapper}>
                      <img src={logo17} alt="" className={styles.t1065__img} />
                    </div>
                    <div
                      className={`${styles.t1065__item_text} ${styles.t_descr} ${styles.t_descr_md}`}
                    >
                      <strong>More than 200 direct houses</strong>
                    </div>
                  </div>
                  <div
                    className={`${styles.t1065__item} ${styles.t1065__item_flex}`}
                  >
                    <div className={styles.t1065__imgwrapper}>
                      <img src={logo18} alt="" className={styles.t1065__img} />
                    </div>
                    <div
                      className={`${styles.t1065__item_text} ${styles.t_descr} ${styles.t_descr_md}`}
                    >
                      <strong>Thorough check</strong>
                    </div>
                  </div>
                  <div
                    className={`${styles.t1065__item} ${styles.t1065__item_flex}`}
                  >
                    <div className={styles.t1065__imgwrapper}>
                      <img src={logo19} alt="" className={styles.t1065__img} />
                    </div>
                    <div
                      className={`${styles.t1065__item_text} ${styles.t_descr} ${styles.t_descr_md}`}
                    >
                      <strong>By your side until housewarming!</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <div className={styles.form_for_call_container}>
          <h1>Have questions about the object?</h1>
          <p>Fill out the application and we will call you back</p>
          <form onSubmit={(e) => SentDataToBot(e)} className={styles.form_call}>
            <input
              type="text"
              name="first_name"
              placeholder="Name"
              value={formDataClient.first_name}
              onChange={handleInputChange}
              className={styles.form_input}
            />
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={formDataClient.phone}
              onChange={handleInputChange}
              className={styles.form_input}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              value={formDataClient.email}
              onChange={handleInputChange}
              className={styles.form_input}
            />
            <input
              type="submit"
              value="Send"
              className={styles.form_submit_btn}
            />
          </form>
        </div>
      </Modal>
      <div className={styles.gen_object}>All builds</div>
    </div>
  );
};
export default HeaderHome;
