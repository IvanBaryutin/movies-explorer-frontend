import "./Techs.css";

function Techs() {
  return (
    <section className="tech" id="tech">
      <div className="tech__block">
        <h2 className="subtitle">Технологии</h2>
        <p className="tech__heading">7 технологий</p>
        <p className="tech__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="tech__items">
          <li className="tech__item">HTML</li>
          <li className="tech__item">CSS</li>
          <li className="tech__item">JS</li>
          <li className="tech__item">React</li>
          <li className="tech__item">Git</li>
          <li className="tech__item">Express.js</li>
          <li className="tech__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
