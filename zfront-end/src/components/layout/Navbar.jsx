import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { Api } from "../../api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (!refresh || !access) {
      console.log("No token found");
      return;
    }

    Api.post(
      "/User/logout/",
      { refresh },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    )
      .then((response) => {
        console.log("Logout success:", response.data);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Logout error:", error.response.data);
        } else {
          console.log("Logout error:", error.message);
        }
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
          <button onClick={logout} className="bg-blue-500 px-3 py-1 rounded">
            Logout
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          <span className="material-symbols-outlined text-3xl">
            {open ? 'close' : 'menu'}
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


// import React, { useState } from 'react';
// import { Link as ScrollLink } from 'react-scroll';
// import { useNavigate } from 'react-router-dom'
// import { Api } from "../../api";


// const Navbar = () => {
//   const [open ,setOpen] = useState(false)

// function logout() {
//   const refresh = localStorage.getItem("refresh");
//   const access = localStorage.getItem("access");

//   if (!refresh || !access) return console.log("No token found");

//   Api.post(
//     "/User/logout/",
//     { refresh }, // body
//     {
//       headers: {
//         Authorization: `Bearer ${access}`, // access token for authentication
//       },
//     }
//   )
//     .then((response) => {
//       console.log("Logout success:", response.data);
//       localStorage.removeItem("access");
//       localStorage.removeItem("refresh");
//       navigate("/login");
//     })
//     .catch((error) => {
//       console.log("Logout error:", error.response?.data);
//     });
// }


//   return (
//     <nav className=" top-0 left-0 w-full z-20 text-white font-bold bg-transparent fixed">
//       <div className="flex justify-between items-center p-5">
//         <h1 className="text-4xl font-serif">NovusHaus</h1>

//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex gap-8">
//           <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
//           <li><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li>
//           <li><ScrollLink to="craft" smooth={true} duration={500}>Craft</ScrollLink></li>
//           <li><ScrollLink to="testimonials" smooth={true} duration={500}>Testimonials</ScrollLink></li>
//           <li><ScrollLink to="blog" smooth={true} duration={500}>Blog</ScrollLink></li>
//           <button onClick={logout}>Logout</button>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button className="lg:hidden" onClick={() => setOpen(!open)}>
//           <span className="material-symbols-outlined text-3xl">
//             {open ? 'close' : 'menu'}
//           </span>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <ul className="flex flex-col gap-4 lg:flex-row lg:gap-8 font-bold px-5">
//           <li className="text-black hover:text-white flex items-center gap-2">
//             <span className="material-symbols-outlined">home</span>
//             <ScrollLink to="home" smooth={true} duration={500} onClick={() => setOpen(false)}>Home</ScrollLink>
//           </li>

//           <li className="text-black hover:text-white  flex items-center gap-2">
//             <span className="material-symbols-outlined">info</span>
//             <ScrollLink to="about" smooth={true} duration={500} onClick={() => setOpen(false)}>About</ScrollLink>
//           </li>

//           <li className="text-black hover:text-white  flex items-center gap-2">
//             <span className="material-symbols-outlined">handyman</span>
//             <ScrollLink to="craft" smooth={true} duration={500} onClick={() => setOpen(false)}>Craft</ScrollLink>
//           </li>

//           <li className="text-black hover:text-white  flex items-center gap-2">
//             <span className="material-symbols-outlined">forum</span>
//             <ScrollLink to="testimonials" smooth={true} duration={500} onClick={() => setOpen(false)}>Testimonials</ScrollLink>
//           </li>

//           <li className="text-black hover:text-white  flex items-center gap-2">
//             <span className="material-symbols-outlined">newspaper</span>
//             <ScrollLink to="blog" smooth={true} duration={500} onClick={() => setOpen(false)}>Blog</ScrollLink>
//           </li>

//           <button onClick={logout}>Logout</button>

//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
