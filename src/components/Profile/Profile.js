import React from "react";
import { useFormWithValidation } from "../../utils/FormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } =
    useFormWithValidation(currentUser);

  function handleClickExit(evt) {
    props.onSignOut();
  }

  function handleClickUpdate() {
    props.onUpdateProfile(values.name, values.email);
  }

  return (
    <section className="profile">
      <div className="profile__form">
        <p className="profile__title">Привет, {currentUser.name}</p>
        <form className="profile__inputs-table">
          <label htmlFor="name" className="profile__label">
            Имя
          </label>
          <input
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            type="text"
            placeholder=""
            className="profile__input"
            pattern="^[а-яА-ЯёЁa-zA-Z -]+$"
            value={values.name || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="profile__error">{errors.name || " "}</p>
          <label htmlFor="email" className="profile__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder=""
            className="profile__input"
            pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
            value={values.email || ""}
            onChange={handleChange}
            required
          ></input>
          <p className="profile__error">{errors.email || " "}</p>
        </form>
      </div>
      <div className="profile__footer">
        {props.errorText !== "" && (
          <p className="profile__submit-result-error">{props.errorText}</p>
        )}
        <button
          type="submit"
          className="profile__button"
          onClick={handleClickUpdate}
          disabled={!isValid ? "disabled" : ""}
        >
          {props.buttonText}
        </button>
        <button
          type="submit"
          className="profile__button profile__button_color_red"
          onClick={handleClickExit}
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
