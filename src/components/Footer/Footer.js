import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className="footer__copyright">© 2020.</p>
      <nav>
        <ul className="footer__links">
          <li>
            <a href="https://yandex.ru/maps" className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a href="https://yandex.ru/pogoda" className="footer__link">
              Github
            </a>
          </li>
          <li>
            <a href="https://rasp.yandex.ru" className="footer__link">
              Facebook
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
