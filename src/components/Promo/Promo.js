import { HashLink } from "react-router-hash-link";
import "./Promo.css";

function Promo() {
  return (
    <section className="cover">
      <h1 className="cover__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <ul className="cover__links">
        <li>
          <HashLink smooth to="/#about" className="cover__link-item">
            О проекте
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#tech" className="cover__link-item">
            Тезнологии
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#student" className="cover__link-item">
            Студент
          </HashLink>
        </li>
      </ul>
    </section>
  );
}

export default Promo;
