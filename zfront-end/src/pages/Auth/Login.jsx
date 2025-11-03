import { useState } from "react";
import { Api } from "../../api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [Forms, SetForms] = useState({ email: "", password: "" });
  const [Errors, SetErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetForms((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login payload:", Forms);

    Api.post("/User/login/", Forms)
      .then((response) => {
        console.log("Login success:", response.data);

        localStorage.setItem("token", response.data.token.access);
        localStorage.setItem("refresh", response.data.token.refresh);
        // localStorage.setItem("access", response.data.token.access);
        // localStorage.setItem("refresh", response.data.token.refresh);
        navigate("/"); // redirect after login
      })
      .catch((error) => {
        console.log("Login error:", error.response);
        SetErrors(error.response?.data.message || "Login failed");
      });
  };

  return { handleChange, handleSubmit, Forms, Errors };
};



