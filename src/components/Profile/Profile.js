import React from 'react';
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__form">
        <p className='profile__title'>Привет, Виталий!</p>
        <form className="profile__inputs-table" >
            <label htmlFor='name' className="profile__label">Имя</label>
            <input id="name" name="name" type="text" placeholder="" className="profile__input" defaultValue="Виталий" required></input>
            <label htmlFor='email' className="profile__label">E-mail</label>
            <input id="email" name="email" type="email" placeholder="" className="profile__input" defaultValue="pochta@yandex.ru" required></input>
          </form>
      </div>
      <div className="profile__footer">
        <button type="submit" className="profile__button">Редактировать</button>
        <button type="submit" className="profile__button profile__button_color_red">Выйти из аккаунта</button>
      </div>

    </section>
  )
}

export default Profile;
