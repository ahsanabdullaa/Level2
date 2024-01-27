import GenericServices from "./GenericServices";

class UserService extends GenericServices {
  constructor() {
    super();
  }
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("users/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  register = (name, email, password) =>
    this.post("users/register", { name, email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  logout = () => {
    localStorage.removeItem("token");
  };

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
}

let userService = new UserService();

export default userService;
