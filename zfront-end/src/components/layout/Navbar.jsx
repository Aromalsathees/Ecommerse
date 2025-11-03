
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Api } from "../../api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch user data if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // No token → skip API call

    Api.get("/User/get_user_data/")
      .then((response) => {
        setUserData(response.data.Data);
      })
      .catch((error) => {
        console.log("error:", error.response?.data);
      });
  }, []);

  // ✅ Logout function
  const logout = () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("token");

    if (!refresh || !access) {
      console.log("No token found");
      return;
    }

    Api.post(
      "/User/logout/",
      { refresh },
      {
        headers: { Authorization: `Bearer ${access}` },
      }
    )
      .then((response) => {
        console.log("Logout success:", response.data);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Logout error:", error.response?.data || error.message);
      });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 text-white font-bold bg-transparent">
      <div className="flex justify-between items-center p-5">
        <h1 className="text-4xl font-serif">NovusHaus</h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          {["home", "about", "craft", "testimonials", "blog"].map((section) => (
            <li key={section}>
              <ScrollLink to={section} smooth={true} duration={500}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            </li>
          ))}

          {userData && <p>Welcome, {userData.username}</p>}

          <button onClick={logout} className="bg-blue-500 px-3 py-1 rounded">
            Logout
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <span className="material-symbols-outlined text-3xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-4 lg:flex-row lg:gap-8 font-bold px-5 bg-white text-black p-5">
          {["home", "about", "craft", "testimonials", "blog"].map((section) => (
            <li key={section} className="flex items-center gap-2">
              <ScrollLink
                to={section}
                smooth={true}
                duration={500}
                onClick={() => setOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            </li>
          ))}

          {userData && <p>{userData.username}</p>}

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
