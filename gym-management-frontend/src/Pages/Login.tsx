import { useState } from "react";
import "../components/styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (event : any) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    toast.success("Login Successfull", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

     // 🔑 token save karo
 localStorage.setItem("token", data.data.sessionId);
    
    // 🚀 navigate
    navigate("/dashboard");
  };

  //   const handleName = (event) => {
  //     setForm({
  //       ...form,
  //       username: event.target.value,
  //     });
  //   };

  //   const handleEmail = (event) => {
  //     setForm({
  //       ...form,
  //       email: event.target.value,
  //     });
  //   }

  //   const handlePassword = (event) => {
  //     setForm({
  //       ...form,
  //       password: event.target.value,
  //     });
  //   }

  const handleChange = (event : any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={login}>
          <h1>Login In</h1>
          <label htmlFor="email">Email:</label>
          <input
            value={form.email}
            type="email"
            id="email"
            name="email"
            required
            onInput={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            value={form.password}
            type="password"
            id="password"
            name="password"
            required
            onInput={handleChange}
          />

          <button type="submit">Login IN</button>

          <button type="button" className="toggle-btn" onClick={handleSignup}>
            Don't have an account? Sign Up
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
}

export default SignUp;
