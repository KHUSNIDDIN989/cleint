import React from "react";
import { Link, Navigate } from "react-router-dom";

import useToken from "../hooks/useToken";
import { useMutation, gql } from "@apollo/client";

const NewUser = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const Regstr = () => {
  const [token, setToken] = useToken();
  const [UserRegstr] = useMutation(NewUser, {
    update: (cache, data) => {
      setToken(data.data.login);
    },
  });
  const sendPostRegstr = (e) => {
    e.preventDefault();
    const { name, password1, password2 } = e.target.elements;
    if (password1.value !== password2.value) {
      return window.alert("parol mosemas");
    }
    UserRegstr({
      variables: {
        username: name.value,
        password: password1.value,
      },
    });

    e.target.reset();
  };

  if (token) {
    return <Navigate to="/admin/addminrest" />;
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center ">
      <form
        className="w-50 shadow-lg rounded-4 p-5"
        onSubmit={(e) => sendPostRegstr(e)}
      >
        <h3>Ro’yxatdan o’tish</h3>
        <input
          name="name"
          type="text"
          className="form-control my-3 shadow-sm"
          placeholder="ism familiya"
        />

        <input
          name="password1"
          type="password"
          className="form-control my-3 shadow-sm"
          placeholder="parolni kiriting"
        />
        <input
          name="password2"
          type="password"
          className="form-control my-3 shadow-sm"
          placeholder="parolni qayta kiriting"
        />
        <button className="btn btn-secondary w-100 mb-3 shadow-sm">
          Kirish
        </button>
        <p>
          Menda acount bor
          <Link to="/login" className="text-primary cursor">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Regstr;
