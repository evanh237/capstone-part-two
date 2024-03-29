import { login, getAllUsers, getUserCart } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ token, setToken, setUser, setCart }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login(username, password);
    const user = await getAllUsers(username);
    const userCart = await getUserCart(user.id);

    // console.log("user-->", user, "userscart-->", userCart);
    setUser(user);

    setCart(userCart);
    setToken(token);
    setPassword("");
    setUserName("");
    navigate("/");
  };

  // const handleLogout = () => {
  //   setToken(null);
  //   setUser(null);
  //   setCart(null);
  //   navigate("/login");
  // };

  // if (token) {
  //   return (
  //     <div className="login-container">
  //       <h1>You're Logged In!</h1>
  //       <br />
  //       <p>
  //         <button className="logout-button">Log out</button>
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Log In</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwod">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default Login;
