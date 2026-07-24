import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light"
        style={{
          position: "absolute",
          top: "-15px",
          left: "-90px",
          width: "50px",
          height: "50px",
          fontSize: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",
          zIndex: 10,
          backgroundColor: "#fff",
        }}
        title="Go Back"
      >
        ←
      </button>

      <div className="row align-items-center">
        <div className="col-md-2">
          <img
            src="https://milestoneenterprises.in/wp-content/uploads/2024/06/cropped-cropped-Group-6-3.png"
            alt="logo"
            className="img-fluid"
            width={"150"}
          />
        </div>

        <div className="col-md-7">
          <h1>
            <span
              className="text-warning"
              style={{ fontSize: "45px", fontWeight: "bold" }}
            >
              Milestone
            </span>
            <span className="text-dark" style={{ fontSize: "50px" }}>
              {" "}
              Enterprises
            </span>
          </h1>
        </div>

        <div className="col-md-3 text-end">
          <img
            src="https://play-lh.googleusercontent.com/sxD0MPTXvEWt2XyuCfVq2mxIdMTpIcGkuv3PNIWv42MUgdU8MLabnFYnl-BnfRBoDZupspeYzsUYf5AqzsCLZQ=s256-rw"
            alt="design"
            className="img-fluid"
            width={350}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
