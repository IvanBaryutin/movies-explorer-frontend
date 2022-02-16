import { Route } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <Route exact path={["/movies", "/saved-movies", "/"]}>
      <footer className="footer">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <p className="footer__copyright">© 2020.</p>
        <nav>
          <ul className="footer__links">
            <li>
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/IvanBaryutin/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/baryutin"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </Route>
  );
}

export default Footer;
