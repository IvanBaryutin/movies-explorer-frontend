import "./Promo.css";

function Promo() {
  return (
    <section className="cover">
      <h1 className="cover__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <ul className="cover__links">
        <li>
          <a href="#" className="cover__link-item">
            О проекте
          </a>
        </li>
        <li>
          <a href="#" className="cover__link-item">
            Технологии
          </a>
        </li>
        <li>
          <a href="#" className="cover__link-item">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Promo;
