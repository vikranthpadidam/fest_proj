import React, { useState, useEffect } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { BiHome } from "react-icons/bi"; // Import the home icon
import { useNavigate } from "react-router-dom";

function NavbarPage() {
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    console.log("Clicked event:", event);
    if (event.toLowerCase() === "admin") {
      console.log("ellow");
      navigate("/admin_login");
    } else {
      // Navigate to the "/event" route programmatically
      navigate(`./${event.toLowerCase()}`);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const [isEventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [images] = useState([
    "images/cup_img.jpg",
    "images/cup_img.jpg",
    "images/cup_img.jpg",
  ]);

  const handleEventsHover = () => {
    setEventsDropdownOpen(true);
  };

  const handleEventsLeave = () => {
    setEventsDropdownOpen(false);
  };

  const scrollToSection = (sectionId) => {
    scroll.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    // Preload images
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" onClick={scrollToTop}>
          <BiHome className="mr-2" /> Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/timetables">
                TimeTables
              </Link>
            </li>
            <li
              className={`nav-item dropdown ${
                isEventsDropdownOpen ? "show" : ""
              }`}
              onMouseEnter={handleEventsHover}
              onMouseLeave={handleEventsLeave}
            >
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isEventsDropdownOpen}
              >
                Events
              </span>
              <div
                className={`dropdown-menu ${
                  isEventsDropdownOpen ? "show" : ""
                }`}
              >
                {/* Add your sub-sub-buttons for Events here */}
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("cricket")}
                >
                  Cricket
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("vollyball")}
                >
                  Vollyball
                </Link>
                {/* Add more sub-sub-buttons as needed */}
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("basketball")}
                >
                  Basketball
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("kabbadi")}
                >
                  Kabbadi
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("football")}
                >
                  Football
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("badminton")}
                >
                  Badminton
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("tabletennis")}
                >
                  Tabletennis
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("throwball")}
                >
                  Throwball
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("running")}
                >
                  Running
                </Link>
                <Link
                  className="dropdown-item"
                  onClick={() => handleEventClick("carroms")}
                ></Link>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => handleEventClick("statistics")}
              >
                Statistics
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => scrollToSection("achievements")}
              >
                Achievements
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={() => handleEventClick("admin")}
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPage;
