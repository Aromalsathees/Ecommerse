// import axios from "axios";

// export const Api = axios.create({
//   baseURL: "http://localhost:8000",
// });

// // ✅ Automatically attach token — but skip for login/register
// Api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   // Skip sending token for login or signup endpoints
//   if (token && !config.url.includes("/User/login/") && !config.url.includes("/User/register/")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:8000",
});

// ✅ Automatically attach token — but skip for login/register/admin signup
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Endpoints that do NOT need authentication
  const noAuthNeeded = [
    "/User/login/",
    "/User/signup/",
    "/User/Admin_signup/",
  ];

  // Attach token only if not in the skip list
  if (token && !noAuthNeeded.some((url) => config.url.includes(url))) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
