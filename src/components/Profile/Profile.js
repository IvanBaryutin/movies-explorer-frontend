import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleClickExit(evt) {
    props.onSignOut();
  }

  function handleClickUpdate() {
    props.onUpdateProfile(name, email);
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
            type="text"
            placeholder=""
            className="profile__input"
            // defaultValue={currentUser.name}
            value={name}
            onChange={handleChangeName}
            required
          ></input>
          <label htmlFor="email" className="profile__label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder=""
            className="profile__input"
            // defaultValue={currentUser.email}
            value={email}
            onChange={handleChangeEmail}
            required
          ></input>
        </form>
      </div>
      <div className="profile__footer">
        <button type="submit" className="profile__button"
          onClick={handleClickUpdate}>
          Редактировать
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
