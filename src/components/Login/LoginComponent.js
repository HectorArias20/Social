import React from "react";
import { Container } from "./Login.styled";
import LoginBlock from "./LoginBlock";
import "../../App.css";

const LoginComponent = (props) => {
 
    return(
    <Container>
      <div className={`app app--is-${props.mode}`}>
        <LoginBlock
          mode={props.mode}
          onSubmit={function () {
            console.log("submit");
          }}
        />
      </div>
    </Container>)

};

export default LoginComponent;
