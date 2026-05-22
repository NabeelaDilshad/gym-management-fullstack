import { useState } from "react";
import "../components/styles/Auth.css";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const register = async (event: any) => {
    event.preventDefault();
    // console.log(form);
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log("data", data);
  };

  const handleLogin = () => {
    navigate("/login");
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

  return (
    <>
      <div className="form-container">
        <form onSubmit={register}>
          <h1>Sign Up</h1>
          <label htmlFor="username">Username:</label>
          <input
            value={form.username}
            type="text"
            id="username"
            name="username"
            required
            onInput={handleChange}
          />

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

          <button type="submit">Sign Up</button>
          <button className="toggle-btn" onClick={handleLogin}>
            Already have an account? Login
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
