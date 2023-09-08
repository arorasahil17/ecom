import "./App.css";
const Client = () => {
  return (
    <>
      <div className="container client">
        <div className="row justify-content-center">
          <h4 className="fw-bold text-center mb-5">OUR CLIENTS</h4>
          <div className="col-md-2">
            <img src="images/Logo_1.png" alt="logo" className="img-fluid" />
          </div>
          <div className="col-md-2">
            <img src="images/Logo_2.png" alt="logo" className="img-fluid" />
          </div>
          <div className="col-md-2">
            <img src="images/Logo_3.png" alt="logo" className="img-fluid" />
          </div>
          <div className="col-md-2">
            <img src="images/Logo_4.png" alt="logo" className="img-fluid" />
          </div>
          <div className="col-md-2">
            <img src="images/Logo_5.png" alt="logo" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Client;
