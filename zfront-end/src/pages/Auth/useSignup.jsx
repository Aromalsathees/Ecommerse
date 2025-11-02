import { useState } from "react";
import { Api } from "../../api";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const navigate = useNavigate();
  const [Forms, SetForms] = useState({ username: "", email: "", password: "", password2: "" });
  const [Errors, SetErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetForms((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload sent to backend:", Forms);

    Api.post("/User/signup/", Forms)
      .then((response) => {
        console.log("Signup success:", response.data);
        localStorage.setItem("access", response.data.token.access);
        localStorage.setItem("refresh", response.data.token.refresh);
        navigate("/"); // redirect after signup
      })
      .catch((error) => {
        console.log("Signup errors:", error.response);
        SetErrors(error.response?.data.message || "Signup failed");
      });
  };

  return { handleChange, handleSubmit, Forms, Errors };
};
