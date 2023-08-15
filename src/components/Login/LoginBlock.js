import React, { useState } from 'react'
import { FormBlock, FormBlockWrapper, FormHeader, FormToggleBlock } from './Login.styled';
import LoginForm from './LoginForm';



export default function LoginComponent(props) {

  const [mode, setMode] = useState(props.mode)
  const [onSubmit]=useState(props.onSubmit)
  const toggleMode = () => {
    var newMode = mode === 'login' ? 'signup' : 'login';
    setMode(newMode);
}

    return (
        <div>
            <FormBlockWrapper type={mode} ></FormBlockWrapper>
            <FormBlock className={`form-block--is-${mode}`}>
                <FormHeader>
                    <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                    <FormToggleBlock>
                        <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                        <input id="form-toggler" type="checkbox" onClick={toggleMode.bind()} />
                        <label htmlFor="form-toggler"></label>
                    </FormToggleBlock>
                </FormHeader>
                <LoginForm mode={mode} onSubmit={props.onSubmit} />
            </FormBlock>
        </div>
    )
}
  

