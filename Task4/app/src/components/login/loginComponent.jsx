import { React, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";

export default function LoginComponent(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("ahsan@ahsan.com");
  const [unerr, setUnerr] = useState(false);
  const [password, setPassword] = useState("ahsan");
  const [pwerr, setPwerr] = useState(false);

  const changePage = (e) => {
    e.preventDefault();
    props.changePage();
  };
  const submitData = () => {
    if (email === "") {
      setUnerr(true);
      return;
    }
    if (password === "") {
      setPwerr(true);
      return;
    }
    setPwerr(false);
    setUnerr(false);

    userService
      .login(email, password)
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };
  return (
    <div>
      {" "}
      <form className="p-20 flex justify-center flex-col">
        <label className="my-2 text-white text-lg">Email</label>

        <input
          className="p-2 rounded"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setUnerr(false);
          }}
        />
        {unerr ? <p className="text-red-500">Please enter a email</p> : null}
        <label className="my-2 text-white text-lg">Password</label>
        <input
          className="p-2 rounded"
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          onChange={(e) => {
            setPassword(e.target.value);
            setPwerr(false);
          }}
        />
        {pwerr ? <p className="text-red-500">Please enter a password</p> : null}
        <div className="flex justify-center">
          <button
            type="submit"
            className="loginBtn"
            onClick={(e) => {
              e.preventDefault();
              submitData();
            }}
          >
            Login
          </button>
        </div>
        <div className="text-white" onClick={changePage}>
          Don't have an account?{" "}
          <a href="/signup" className="text-sky-600 text-sm">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
