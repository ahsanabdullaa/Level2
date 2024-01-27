import { React, useState } from "react";
import "./signup.css";
import userService from "../../services/UserService";
export default function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unerr, setUnerr] = useState(false);
  const [pwerr, setPwerr] = useState(false);
  const [emerr, setEmerr] = useState(false);

  const changePage = (e) => {
    props.changePage();
  };
  const register = () => {
    if (username === "") {
      setUnerr(true);
      return;
    }
    if (email === "") {
      setEmerr(true);
      return;
    }
    if (password === "") {
      setPwerr(true);
      return;
    }
    setPwerr(false);
    setUnerr(false);
    setEmerr(false);

    // console.log(data);
    userService
      .register(username, email, password)
      .then((e, res) => {
        // e.preventDefault();
        changePage();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response);
      });
  };
  return (
    <div>
      {" "}
      <form className="p-20 flex justify-center flex-col">
        <label className="my-2 text-white text-lg">Username</label>
        <input
          className="p-2 rounded"
          type="text"
          placeholder="Enter Username"
          name="uname"
          required
          onChange={(e) => {
            setUsername(e.target.value);
            setUnerr(false);
          }}
        />
        {unerr ? (
          <div className="text-red-500">Please enter a valid username</div>
        ) : null}
        <label className="my-2 text-white text-lg">Email</label>
        <input
          className="p-2 rounded"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setEmerr(false);
          }}
        />
        {emerr ? (
          <div className="text-red-500">Please enter a valid email</div>
        ) : null}
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
        {pwerr ? (
          <div className="text-red-500">Please enter a valid password</div>
        ) : null}
        <div
          className="flex justify-center"
          onClick={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <button type="submit" className="signBtn">
            Signup
          </button>
        </div>
        <div className="text-white" onClick={changePage}>
          Already Registered?{" "}
          <a href="/signup" className="text-sky-600 text-sm">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
}
