import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Input from "../Input";
import CheckBox from "../../controls/Checkbox";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import {
  Container,
  FormBlock,
  FormBlockInputWrapper,
  FormBlockWrapper,
  FormHeader,
} from "./Login.styled";
import "../../App.css";
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
export default function VerificationComponent(props) {
  const { user } = useParams();
  console.log(user)
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
  
  //console.log(JSON.parse(localStorage.getItem("user")));
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    Login();
    //props.mode === "login" ? Login() : Register();
    //activeUser({name:"michael"})
  };
  

  const Login = async () => {
    const query = {
      method: "POST",
      url: "http://localhost:8080/api/users/verifysignup",
      data: {
        email: user,
        code: code,
      },
    };
    await axios(query)
      .then((response) => {
        console.log(response)
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
          text: "The email or the password does not match",
        });
      });
  };
  return (
    <Container>
      <div className={`app app--is-login`}>
        <div>
          <FormBlockWrapper type={"login"}></FormBlockWrapper>
          <FormBlock className={`form-block--is-login`}>
            <FormHeader>
              <h1>Verify the code</h1>
            </FormHeader>
            <form onSubmit={onSubmit}>
              <div className='form-block__input-wrapper'>
                <div className='form-group form-group--login'>
                  <Input
                    type='text'
                    //id='username'
                    name='code'
                    label='Verify the code send to your phone number'
                    value={code}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <button
                className='button button--primary full-width'
                type='submit'
              >
                Verify
              </button>
            </form>
          </FormBlock>
        </div>
      </div>
    </Container>
  );
}
