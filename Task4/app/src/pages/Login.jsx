import { React, useState } from "react";
import "./login.css";
import LoginComponent from "../components/login/loginComponent";
import SignUp from "../components/signUp/signup";
export default function Login() {
  const [active, setActive] = useState(true); // ["login", "signup"]
  const changePage = () => {
    setActive(!active);
  };

  return (
    <div className="header">
      <div>
        {active ? (
          <LoginComponent changePage={changePage} />
        ) : (
          <SignUp changePage={changePage} />
        )}
      </div>
    </div>
  );
}
