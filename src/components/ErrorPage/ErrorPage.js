import './ErrorPage.css';

function ErrorPage() {
  return (
    <section className="error-page">
      <h2 className="error-page__title">404</h2>
      <p className="error-page__subtitle">Страница не найдена</p>
      <a href="/" className="error-page__link">Назад</a>
    </section>
  );
}

export default ErrorPage;
