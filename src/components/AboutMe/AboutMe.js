import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="subtitle">Студент</h2>
      <div className="student__info">
        <p className="student__name">Виталий</p>
        <p className="student__description">Фронтенд-разработчик, 30 лет</p>
        <p className="student__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <ul className="student__social-links">
          <li>
            <a href="https://www.facebook.com/baryutin" className="student__social-link" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://github.com/IvanBaryutin/" className="student__social-link" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>
      <div className="student__photo"></div>
      <div className="student__portfolio">
        <p className="student__portfolio-title">Портфолио</p>
        <ul className="student__portfolio-links">
          <li>
            <a href="https://github.com/IvanBaryutin/how-to-learn" className="student__portfolio-link" target="_blank" rel="noreferrer">
              Статичный сайт
            </a>
          </li>
          <li>
            <a href="https://ivanbaryutin.github.io/russian-travel/index.html" className="student__portfolio-link" target="_blank" rel="noreferrer">
              Адаптивный сайт
            </a>
          </li>
          <li>
            <a href="https://github.com/IvanBaryutin/react-mesto-api-full" className="student__portfolio-link student__portfolio-link_style_clear" target="_blank" rel="noreferrer">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
