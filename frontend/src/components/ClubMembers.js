// ClubMembers.js
import React from "react";

function ClubMembers() {
  return (
    <div className="club-members-section mt-4">
      <h2>Club Members</h2>
      <div className="d-flex justify-content-around align-items-center">
        <div className="member">
          <img
            src="images/go1.jpg"
            alt="President"
            className="member-logo rounded-circle img-fluid"
            style={{ width: "200px", height: "200px" }}
          />
          <p>President</p>
        </div>
        <div className="member">
          <img
            src="images/go2.jpg"
            alt="Vice President"
            className="member-logo rounded-circle img-fluid"
            style={{ width: "200px", height: "200px" }}
          />
          <p>Vice President</p>
        </div>
        <div className="member">
          <img
            src="images/go3.jpg"
            alt="Event Manager"
            className="member-logo rounded-circle img-fluid"
            style={{ width: "200px", height: "200px" }}
          />
          <p>Event Manager</p>
        </div>
      </div>
    </div>
  );
}

export default ClubMembers;
