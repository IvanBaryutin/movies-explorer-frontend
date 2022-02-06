import "./Preloader.css";

function Preloader(props) {


  return (
    <div className="preloader">
      <span className="preloader__dot"></span>
      <div className="preloader__dots">
        <span className="preloader__dots-item"></span>
        <span className="preloader__dots-item"></span>
        <span className="preloader__dots-item"></span>
      </div>
    </div>
  );
}

export default Preloader;
