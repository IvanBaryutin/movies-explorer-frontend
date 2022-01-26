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
            <a href="#" className="student__social-link">
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className="student__social-link">
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
            <a href="#" className="student__portfolio-link">
              Статичный сайт
            </a>
          </li>
          <li>
            <a href="#" className="student__portfolio-link">
              Адаптивный сайт
            </a>
          </li>
          <li>
            <a
              href="#"
              className="student__portfolio-link student__portfolio-link_style_clear"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
