import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Input from "../Input";
import CheckBox from "../../controls/Checkbox";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
const defaultFormFields = {
  email: "",
  password: "",
  passwordConfirm: "",
  id: 0,
  name: "",
  firstName: "",
  lastName: "",
  phone: "",
  username: "",
  code: 0,
  isActive2FA: false,
};
export default function LoginForm(props) {
  const navigate = useNavigate();
  const { currentUser, activeUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    name,
    username,
    lastName,
    firstName,
    phone,
    email,
    password,
    passwordConfirm,
    code,
    isActive2FA,
  } = formFields;
  console.log(JSON.parse(localStorage.getItem("user")));
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.mode === "login" ? Login() : Register();
  
  };
  const Register = async () => {
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The password does not match",
      });
    } else {
      const query = {
        method: "POST",
        url: "http://localhost:8080/api/users/signup",
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          is_active2FA: false,
        },
      };
      await axios(query)
        .then((response) => {
          activeUser({
            id: response.data.data.user.id,
            firstName: response.data.data.user.firstName,
            lastName: response.data.data.user.lastName,
            isActive2FA: response.data.data.user.is_active2FA,
            email: response.data.data.user.email,
            phone: response.data.data.user.phone,
            token: response.data.token,
          });
          console.log(response.data.data.user);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email is already in use or have failed to sign in",
          });
        });
    }
  };

  const Login = async () => {
    const query = {
      method: "POST",
      url: "http://localhost:8080/api/users/login",
      data: {
        email: username,
        password: password,
      },
    };
    await axios(query)
      .then((response) => {
        console.log(response.data)
        if (response.data.message === 'logged in') {
         
          activeUser({id: response.data.data.user.id, firstName: response.data.data.user.firstName, lastName:response.data.data.user.lastName, isActive2FA: response.data.data.user.is_active2FA, email: response.data.data.user.email, phone:response.data.data.user.phone, token: response.data.token})
          console.log(response.data.data.user);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        } else if(response.data.message === 'Please confirm the code sent to your phonenumber') {
          navigate("/verify/" + username);
        }
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The email or the password does not match",
        });
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <Input
            type="text"
            
            name="username"
            label="Email"
            value={username}
            onChange={handleChange}
            required={true}
            disabled={props.mode === "signup" || props.mode === "verify"}
          />
          <Input
            type="password"
            id="password"
            label="password"
            name="password"
            value={password}
            onChange={handleChange}
            required={true}
            disabled={props.mode === "signup" || props.mode === "verify"}
          />
        </div>
        <div className="form-group form-group--signup">
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            label="First name"
            required={true}
            disabled={props.mode === "login" || props.mode === "verify"}
          />
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            label="Last name"
            required={true}
            disabled={props.mode === "login" || props.mode === "verify"}
          />
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            pattern="\([0-9]{3}\) [0-9]{4}[ -][0-9]{4}"
            onChange={handleChange}
            label="Phone"
            required={true}
            disabled={props.mode === "login" || props.mode === "verify"}
          />
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
            onChange={handleChange}
            label="Email"
            required={true}
            disabled={props.mode === "login" || props.mode === "verify"}
          />
          <Input
            type="password"
            id="createpassword"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required={true}
            disabled={props.mode === "login" || props.mode === "verify"}
          />
          <Input
            type="password"
            id="repeatpassword"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            label="Repeat password"
            required={true}
            disabled={props.mode === "login" || props.mode === "verify"}
          />
          <Input
            type="checkbox"
            id="isActive2FA"
            name="isActive2FA"
            checked={isActive2FA}
            onChange={handleChange}
            label="Do you want to activate 2FA?"
            disabled={props.mode === "login" || props.mode === "verify"}
          />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {props.mode === "login"
          ? "Log In"
          : props.mode === "signup"
          ? "Sign Up"
          : "Verify"}
      </button>
    </form>
  );
}
