import "./AboutProject.css";
import "../Subtitle/Subtitle.css";

function AboutProject() {
  return (
    <section className="about" id="about">
      <h2 className="subtitle">О проекте</h2>
      <div className="about__items">
        <div className="about__item">
          <p className="about__item-title">Дипломный проект включал 5 этапов</p>
          <p className="about__item-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__item">
          <p className="about__item-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about__item-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__timeline">
        <div className="about__timeline-item">1 неделя</div>
        <div className="about__timeline-item about__timelene-item_style_gray80">
          4 недели
        </div>
      </div>
      <div className="about__timeline-description">
        <div className="about__timeline-description-item">Back-end</div>
        <div className="about__timeline-description-item about__timelene-description-item_size_80">
          Front-end
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
