import React from "react";

function KreedaSection() {
  return (
    <div
      className="kreeda-section"
      style={{
        padding: "40px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div className="container">
        {/* Section Heading */}
        <h2 className="section-heading text-center mb-4">Chaitanya Kreeda</h2>

        <div className="row">
          {/* Column with Centered Logo */}
          <div className="col-md-6 d-flex align-items-center justify-content-center mb-4">
            <img
              src="images/kreeda_logo.jpg"
              alt="Kreeda Logo"
              className="kreeda-logo rounded-circle img-fluid"
              style={{ width: "200px", height: "200px" }}
            />
          </div>

          {/* Column with Matter Related to Logo */}
          <div className="col-md-6">
            <div
              className="matter-box p-4"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>
                Your sentences or matter related to the logo can go here. You
                can style this box as needed. Your sentences or matter related
                to the logo can go here. You can style this box as needed. Your
                sentences or matter related to the logo can go here. You can
                style this box as needed. Your sentences or matter related to
                the logo can go here. You can style this box as needed. Your
                sentences or matter related to the logo can go here. You can
                style this box as needed.
                <br />
                Your sentences or matter related to the logo can go here. You
                can style this box as needed. Your sentences or matter related
                to the logo can go here. You can style this box as needed.
              </p>
              {/* Add more content as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KreedaSection;
