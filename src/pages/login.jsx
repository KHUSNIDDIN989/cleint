import React from "react";
import { Link, Navigate } from "react-router-dom";

import useToken from "../hooks/useToken";
import { useMutation, gql } from "@apollo/client";

const Users = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Login = () => {
  const [token, setToken] = useToken();
  const [UserLogin] = useMutation(Users, {
    update: (cache, data) => {
      setToken(data.data.login);
    },
  });

  const sendPostLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    UserLogin({
      variables: {
        username: username.value,
        password: password.value,
      },
    });

    e.target.reset();
  };

  if (token) {
    return <Navigate to="/admin/addminrest" />;
  }

  return (
    <div className="row container">
      <div className="col-8">
        <div className="container vh-100 d-flex justify-content-center align-items-center ">
          <form className="w-75 p-5" onSubmit={(e) => sendPostLogin(e)}>
            <h3>Tizimga Kirish</h3>
            <input
              name="username"
              type="text"
              className="form-control my-3 shadow-sm"
              placeholder="Username"
            />
            <input
              name="password"
              type="password"
              className="form-control my-3 shadow-sm"
              placeholder="parolni kiriting"
            />
            <button className="btn btn-secondary w-100 mb-3 shadow-sm">
              Kirish
            </button>
            <p>
              Men yangi foydalanuvchiman
              <Link to="/regstr" className="text-primary cursor">
                Ro'yxatdan o'tish
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
