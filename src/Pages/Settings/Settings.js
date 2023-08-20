import React, { useState } from "react";
import { Box, Divider, Grid } from "@mui/material";
import { Container } from "./settings.styled";
import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/styles";
import { AccountCircle } from "@mui/icons-material";
import TextFieldComponnent from "../../controls/TexFieldComponent";
import { InputAdornment, ThemeProvider } from "@material-ui/core";
import Checkbox from "../../controls/Checkbox";
import Button from "../../controls/Button";
import { borderColor } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import twitterImg from "../../images/twitter.gif";
import linkedinImg from "../../images/linkedin.gif";
import Redirect from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import Toast from "../../components/ToastComponent/ToastComponent";
import Tooltip from '@mui/material/Tooltip';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "right",
  color: theme.palette.text.secondary,
}));

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#FFFFFF",
      darker: "#FFFFFF",
    },
    neutral: {
      main: "#FFFFFF",
      contrastText: "#fff",
    },
    //color: "white",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "3%",
    color: "white",
    "& .css-frvxv5-MuiInputBase-root-MuiOutlinedInput-root": {
      color: "white",
    },
    "& .MuiPaper-root": {
      color: "white",
    },
    "& .css-1etkore-MuiFormLabel-root-MuiInputLabel-root": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
  },
  
}));

const themeP = createTheme({
  palette:{
    primary:{
      main: "#333996",
      light:"#3c44b126"
    },
    secondary:{
      main: "#f83245",
      light:"#f8324526"
    },
    background:{
      default:'#f4f5fd'
    },
  },
  shape:{
    borderRadius:'10px',
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform: 'translateZ(0)'
      }
    }
  },
  props:{
    IconButton:{
      disableRipple: true
    }
  }

})

export default function Settings() {
  let { currentUser, activeUser } = useContext(UserContext);
  const [linkedin, setLinkedin] = useState(false)
  const [twitter, setTwitter]= useState(false)
 // const [user, setUser] = useState(currentUser);
  const defaultFormFields = {
    email: currentUser.email,
    passwordEntry: "",
    newPassword: "",
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    phone: currentUser.phone,
    username: "",
    code: 0,
    isActive2FA: currentUser.isActive2FA,
  };

  const [formFields, setFormFields] = useState({
    email: currentUser.email,
    passwordEntry: "",
    newPassword: "",
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    phone: currentUser.phone,
    username: "",
    code: 0,
    isActive2FA: currentUser.isActive2FA,
  });
  const classes = useStyles();
  const {
    email,
    passwordEntry,
    newPassword,
    code,
    firstName,
    lastName,
    phone,
    isActive2FA,
  } = formFields;

  const handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  useEffect(() => {
    const loadLinkedin= async()=>{
      const queryLinkedin = {
        method: 'GET',
        url: 'http://localhost:8080/api/linkedin/user/' + currentUser.id,
      };
      let result=false;
      await axios(queryLinkedin)
        .then(async(response) => {
          const token = response.data.linkedin.token;
          if(token!=="")setLinkedin(true)
          if(token==="")setLinkedin(false)
          })
          .catch((error) => {
            setLinkedin(false)
          });
    }

    const loadingTwitter= async()=>{
      const queryLinkedin = {
        method: 'GET',
        url: 'http://localhost:8080/api/linkedin/user/' + currentUser.id,
      };
      let result=false;
      await axios(queryLinkedin)
        .then(async(response) => {
          const token = response.data.linkedin.token;
          if(token!=="")setTwitter(true);
          if(token==="")setTwitter(false);
          })
          .catch((error) => {
            setTwitter(false);
          });
    };
    
    loadLinkedin()
    loadingTwitter()
      
    setFormFields({
      email: currentUser.email,
      passwordEntry: "",
      newPassword: "",
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phone: currentUser.phone,
      username: "",
      code: 0,
      isActive2FA: currentUser.isActive2FA,
    });
  }, [
    activeUser,
    currentUser,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordEntry !== newPassword && passwordEntry !== "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The password does not match",
      });
    } else {
      let query = {};
      console.log(passwordEntry);
    if (passwordEntry)
      query = {
        method: "PATCH",
        url: "http://localhost:8080/api/users/" + email,
        data: {
          email: email,
          password: passwordEntry,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          is_active2FA: isActive2FA,
        },
      };
    if (!passwordEntry)
      query = {
        method: "PATCH",
        url: "http://localhost:8080/api/users/" + email,
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          is_active2FA: isActive2FA,
        },
      };
      
    await axios(query)
      .then(async (response) => {
        
        await activeUser({
          id: response.data[1][0].id,
          firstName: response.data[1][0].firstName,
          lastName: response.data[1][0].lastName,
          isActive2FA: response.data[1][0].is_active2FA,
          email: response.data[1][0].email,
          phone: response.data[1][0].phone,
          token: currentUser.token,
        });

        const toast= Toast();
        toast.fire({
          icon: "success",
          title: "Updated successfully",
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

  return (
    <ThemeProvider theme={themeP}>
    <Container>
      <Box sx={{ width: "auto", marginTop: 3, marginBottom: 10 }}>
        <Paper elevation={3}>
          <h1>Personal Information</h1>
        </Paper>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} sx={{ alignContent: "center" }}>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  id='outlined-basic'
                  label='First Name'
                  type='text'
                  name='firstName'
                  InputProps={{
                    className: classes.input,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant='outlined'
                  value={firstName}
                  onChange={handleChange}
                  size='normal'
                  required
                />
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  id='outlined-basic'
                  label='Last Name'
                  type='text'
                  name='lastName'
                  InputProps={{
                    className: classes.input,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant='outlined'
                  value={lastName}
                  onChange={handleChange}
                  size='normal'
                  required
                />
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: 4, paddingTop: 0, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  id='outlined-basic'
                  label='Email'
                  type='text'
                  name='email'
                  InputProps={{
                    className: classes.input,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant='outlined'
                  value={email}
                  onChange={handleChange}
                  size='normal'
                  required
                  disabled
                />
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: 4, paddingTop: 0, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  id='outlined-basic'
                  label='Phone'
                  type='text'
                  name='phone'
                  InputProps={{
                    className: classes.input,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  pattern='\([0-9]{3}\) [0-9]{4}[ -][0-9]{4}'
                  variant='outlined'
                  value={phone}
                  onChange={handleChange}
                  size='normal'
                  required
                />
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: 4, paddingTop: 0, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  id='outlined-basic'
                  label='Password'
                  type='password'
                  name='passwordEntry'
                  InputProps={{
                    className: classes.input,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant='outlined'
                  value={passwordEntry}
                  onChange={handleChange}
                  size='normal'
                  required
                />
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{ padding: 4, paddingTop: 0, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  id='outlined-basic'
                  label='Confirm Password'
                  type='password'
                  name='newPassword'
                  InputProps={{
                    className: classes.input,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant='outlined'
                  value={newPassword}
                  onChange={handleChange}
                  size='normal'
                  required
                />
              </Item>
            </Grid>
            <Grid xs={12} md={6} lg={6}></Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
              sx={{
                padding: 4,
                paddingTop: 0,
                paddingBotton: 0,
                borderColor: "white",
                textAlign: "right",
              }}
            >
              <Checkbox
                id='outlined-basic'
                label='Two Factor Authentication'
                name='isActive2FA'
                value={isActive2FA}
                onChange={handleChange}
              />
              <Button
                type='submit'
                text='Update'
                startIcon={<SendIcon />}
              ></Button>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ marginBotton: 5 }} />
        <Box sx={{ width: "auto", marginTop: 3, marginBottom: 10 }}>
          <Paper elevation={3}>
            <h1>Social Networks</h1>
          </Paper>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ alignContent: "center", paddingTop: 5 }}
        >
          
          <Grid item
            xs={12}
            md={12}
            lg={12}
            sx={{
              padding: 4,
              paddingTop: 0,
              paddingBotton: 0,
              textAlign: "center",
            }}
          >
            {twitter&&<Tooltip title="Twitter Added" arrow><a
              href={`http://localhost:8080/login?user=${currentUser.email}&&userId=${currentUser.id}`}  
              style={{ padding:"5px"}}
            >
              <img
                src={twitterImg}
                alt='my-gif'
                width='80px'
                height='80px'
                style={{ border: "1px solid salmon" }}
              />
            </a></Tooltip>}
            {!twitter&&<Tooltip title="Add Twitter" arrow><a
              href={`http://localhost:8080/login?user=${currentUser.email}&&userId=${currentUser.id}`}  
              style={{ opacity: "30%",padding:"5px" }}
            >
              <img
                src={twitterImg}
                alt='my-gif'
                width='80px'
                height='80px'
                style={{ border: "1px solid salmon" }}
              />
            </a></Tooltip>}


            {linkedin?<Tooltip title="Linkedin Added" arrow><a
              href={`http://localhost:8080/linkedin/auth?user=${currentUser.email}&&userId=${currentUser.id}`}  
            >
               <img
                src={linkedinImg}
                alt='my-gif'
                width='80px'
                height='80px'
                style={{ border: "1px solid salmon" }}
              />
            </a></Tooltip>:<Tooltip title="Add Linkedin" arrow><a
              href={`http://localhost:8080/linkedin/auth?user=${currentUser.email}&&userId=${currentUser.id}`}  
              style={{ opacity: "30%" }}
            >
              <img
                src={linkedinImg}
                alt='my-gif'
                width='80px'
                height='80px'
                style={{ border: "1px solid salmon" }}
              />
            </a></Tooltip>}
          </Grid>
        </Grid>
      </Box>
    </Container>
    </ThemeProvider>
  );
}
