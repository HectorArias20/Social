import React, { useContext, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  TextareaAutosize,
} from "@mui/material";
import { Container } from "./posts.styled";
import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextFieldComponnent from "../../controls/TexFieldComponent";
import { makeStyles } from "@material-ui/styles";
import Button from "../../controls/Button";
import SendIcon from "@mui/icons-material/Send";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import DatePicker from "../../controls/DatePicker";
import DateTimePicker from "../../controls/TimePicker";
import CustomizedAccordion from "../../controls/CustimizeAccordion";
import SocialNetwork from '../../images/socialnetwork.gif'
import moment from 'moment';
import { SnackbarProvider, useSnackbar } from 'notistack';
import ControlSpeedDial from "../../controls/ControlSpeedDial";
import { Alert, ThemeProvider } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Toast from "../../components/ToastComponent/ToastComponent";
import { useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
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

const defaultFormFields = {
  email: "",
  password: "",
  newPassword: "",
  id: 0,
  firstName: "",
  lastName: "",
  phone: "",
  username: "",
  code: 0,
  snap: false,
  type: "",
  date: "",
  hour: "",
  message:"",
  isActive: false,
};

export default function Posts() {
  const [linkedin, setLinkedin] = useState(false)
  const toast = Toast();
  const [twitter, setTwitter]= useState(false)
  const { currentUser, activeUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [posts, setPosts] = useState([]); 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log('close');
    setOpen(false);}
    const handleSave = async() => {
      const data={
          userId: currentUser.id,
          posts: posts
      }

      const query = {
        method: "POST",
        url: "http://localhost:8080/api/publishings/",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + currentUser.token,
        },
        data:{
          userId: currentUser.id,
          posts: posts
      },
      };

      await axios(query)
        .then((response) => {
          console.log(response);

          toast.fire({
            icon: "success",
            title: "Created successfully",
          });
          setFormFields(defaultFormFields);
          setPosts([])
        })
        .catch((error) => {
          //console.log(error.response.data)
          toast.fire({
            icon: "error",
            title: "The schedule already has been asigned",
          });
          setFormFields(defaultFormFields);
          setPosts([])
        });

      console.log(data)
      setOpen(false);}
  const classes = useStyles();
  const {
    email,
    password,
    newPassword,
    code,
    type,
    firstName,
    lastName,
    phone,
    date,
    hour,
    message,
    isActive,
  } = formFields;
  const types = [
    { id: "snap", label: "Snap", onChange: false },
    { id: "queue", label: "Queue", onChange: false },
    { id: "line", label: "Line", onChange: false },
  ];
  const handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    
  };
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };
  useEffect(() => {
    const loadLinkedin= async()=>{
      const queryLinkedin = {
        method: 'GET',
        url: 'http://localhost:8080/api/linkedin/user/' + currentUser.id,
      };
      
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
        url: 'http://localhost:8080/api/twitter/user/' + currentUser.id,
      };
      let result=false;
      await axios(queryLinkedin)
        .then(async(response) => {
          console.log(response.data)
          const token = response.data.twitter.user_token;
          if(token!=="")setTwitter(true);
          if(token==="")setTwitter(false);
          })
          .catch((error) => {
            setTwitter(false);
          });
    };
    
    loadLinkedin()
    loadingTwitter()
      
  }, [currentUser.id])
  useEffect(() => {
    const loadLinkedin= async()=>{
      const queryLinkedin = {
        method: 'GET',
        url: 'http://localhost:8080/api/linkedin/user/' + currentUser.id,
      };
      
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
        url: 'http://localhost:8080/api/twitter/user/' + currentUser.id,
      };
      let result=false;
      await axios(queryLinkedin)
        .then(async(response) => {
          console.log(response.data)
          const token = response.data.twitter.user_token;
          if(token!=="")setTwitter(true);
          if(token==="")setTwitter(false);
          })
          .catch((error) => {
            setTwitter(false);
          });
    };
    
    loadLinkedin()
    loadingTwitter()
      
  }, [])

  const onSend=()=>{

  }
  const onSubmit = (e) => {
    e.preventDefault();
    if(type.toLowerCase()==="line"){
      if(posts.length>0){
        const addPost= [...posts,{type:type.toLowerCase(), day:moment(date).format('DD/MM/YYYY'),hour:moment(hour).format('HH:mm'), message:message, status:"pending"}]
        setPosts(addPost)
      }else{
        setPosts([{type:type.toLowerCase(), day:moment(date).format('DD/MM/YYYY'),hour:moment(hour).format('HH:mm'), message:message,status:"pending"}])}
      
    }else{
      if(posts.length>0){
        const addPost= [...posts,{type:type.toLowerCase(), day:null,hour:null, message:message,status:"pending"}]
        setPosts(addPost)
      }else{
        setPosts([{type:type.toLowerCase(), day:null,hour:null, message:message,status:"pending"}])
      }
    } 
    handleClickVariant('success');
    setFormFields(defaultFormFields);
  };
  return (<SnackbarProvider maxSnack={3}>
    <Container>

      {(linkedin||twitter)?<Box sx={{ width: "auto", marginTop: 3, marginBottom: 10 }}>
        <Paper elevation={3}>
          <h1>Send Posts</h1>
        </Paper>
        <form onSubmit={onSubmit}>
          <Box sx={{ width: "auto", marginTop: 3, marginBottom: 0, pl: 3 }}>
            <h2>Select the type for this post:</h2>
          </Box>
          <RadioGroup
            aria-label='platform'
            defaultValue='Website'
            overlay={true}
            name='type'
            value={type}
            onChange={handleChange}
            required
            sx={{
              flexDirection: "container",
              gap: 2,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -10,
                  border: "3px solid",
                  borderColor: "primary.500",
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: "contents",
                "& > svg": {
                  zIndex: 2,
                  position: "relative",
                  top: "-8px",
                  right: "-8px",
                  bgcolor: "background.body",
                  borderRadius: "50%",
                },
              },
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ paddingBlock: "justify", alignContent: "center" }}
            >
              {["Line", "Queue", "Snap"].map((value,index) => (
                <Grid
                  xs={12}
                  md={4}
                  lg={4}
                  sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
                  key={value}
                >
                  <Item>
                    <Sheet
                      key={value}
                      variant='outlined'
                      sx={{
                        borderRadius: "md",
                        bgcolor: "background.level1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1,
                        minWidth: 120,
                      }}
                    >
                      <Radio
                        id={value}
                        value={value}
                        checkedIcon={<CheckCircleRoundedIcon />}
                      />
                      <Avatar variant='circular' size='sm' />
                      <FormLabel htmlFor={value}>{value}</FormLabel>
                    </Sheet>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <ThemeProvider theme={themeP}>         
          <Grid
            container
            spacing={2}
            sx={{ paddingBlock: "justify", alignContent: "center" }}
          >
            {type === "Line" ? (
              <Grid
                xs={12}
                md={6}
                lg={6}
                sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
              >
                <Item>
                  <DatePicker
                    name='date'
                    label='Date'
                    value={date}
                    onChange={handleChange}
                    required
                  ></DatePicker>
                </Item>
              </Grid>
            ) : (
              ""
            )}
            {type === "Line" ? (
              <Grid
                xs={12}
                md={6}
                lg={6}
                sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
              >
                <Item>
                  <DateTimePicker
                    name='hour'
                    label='Hour'
                    value={hour}
                    onChange={handleChange}
                    required
                  ></DateTimePicker>
                </Item>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              xs={12}
              md={12}
              lg={12}
              sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
            >
              <Item>
                <TextFieldComponnent
                  maxRows={5}
                  minRows={5}
                  label="Message"
                  aria-label='maximum height'
                  placeholder='Maximum 4 rows'
                  //defaultValue='Please type youir post here'
                  name='message'
                  value={message}
                  onChange={handleChange}
                  resize="false"
                  style={{ width: "100%"}}
                  multiline
                  fullWidth
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
              <Button
                type='submit'
                text='Add Post'
                startIcon={<SendIcon />}
              ></Button>
            </Grid>
          </Grid>
          </ThemeProvider>
        </form>
        <ThemeProvider theme={themeP}>
        <Divider sx={{ marginBotton: 5 }} />
        <Box sx={{ width: "auto", marginTop: 3, marginBottom: 5 }}>
          <Paper elevation={3}>
            <h1>Posts's queue</h1>
          </Paper>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ alignContent: "center", marginTop:0, paddingTop: 0 }}
        >
          <Grid
            xs={12}
            md={12}
            lg={12}
            sx={{
              padding: 4,
              paddingRight: 2,
              paddingTop: 0,
              paddingBotton: 0,
              textAlign: "justify",
              marginTop:0,
            }}
          >{posts.length>0&& <ControlSpeedDial open={open} setOpen={setOpen} handleOpen = {handleOpen} handleClose ={handleClose} handleSave={handleSave}></ControlSpeedDial>}
            <CustomizedAccordion posts={posts}></CustomizedAccordion>
            {/* <a href='http://localhost:8080/login?user=a.soliss@gmail.com' style={{opacity:"30%"}}><img src={twitter} alt="my-gif" width="80px" height="80px"style={{border: "1px solid salmon;"}}/></a> */}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ alignContent: "right", paddingBottom: 10 }}
        >
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
          
            {/* <a href='http://localhost:8080/login?user=a.soliss@gmail.com' style={{opacity:"30%"}}><img src={twitter} alt="my-gif" width="80px" height="80px"style={{border: "1px solid salmon;"}}/></a> */}
          </Grid>
        </Grid>
        </ThemeProvider>
      </Box>:
      <Box sx={{ width: "auto",height:"100vh", marginTop: 3,paddingTop:"10%", paddingLeft:"15%", paddingRight:"15%", marginBottom: 10 }}>
        <Alert  severity="error" sx={{ width: 'auto', alignContent:'center'}}>
   There are not connections to the social networks. Please go to the settings page and add some social network to send new posts.
   <img
                src={SocialNetwork}
                alt='my-gif'
                width='50%'
                height='50%'
                style={{ marginTop:"5px", marginLeft:"20%",marginRight:"20%"}}
              />
  </Alert>
      </Box>}
    </Container>
    </SnackbarProvider>
  );
}
