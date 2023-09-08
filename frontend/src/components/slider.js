import "./App.css";
const Slider = () => {
  return (
    <>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="false"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="images/Slide_1.jpg" class="d-block w-100" alt="slide" />
            <div class="carousel-caption d-none d-md-block heading">
              <h1>Up to 70% off</h1>
              <h2>Discount on fall collections</h2>
              <div classname="btn-g">
                <button className="h-btn">What's new</button>
                <button className="h-btn-2">Shop now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Slider;
