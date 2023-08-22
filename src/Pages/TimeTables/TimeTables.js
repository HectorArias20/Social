import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  TextareaAutosize,
} from "@mui/material";
import {
  IconButton,
  InputAdornment,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Container } from "./timetables.styled";
import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextFieldComponnent from "../../controls/TexFieldComponent";
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
import moment from "moment";
import { SnackbarProvider, useSnackbar } from "notistack";
import ControlSpeedDial from "../../controls/ControlSpeedDial";
import Select from "../../controls/Select";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import Search from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import { Label } from "@mui/icons-material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AutorenewRoundedIcon from "@mui/icons-material/Autorenew";
import { Switch } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import Toast from "../../components/ToastComponent/ToastComponent";
import PopUp from "../../controls/PopUp";
import { makeStyles } from "@material-ui/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  //color: theme.palette.text.secondary,
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
const useStyles1 = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 450,
    height: 130,
    //backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    //boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };
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
  message: "",
  selected: "",
  isActive: false,
};

const themeP = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  shape: {
    borderRadius: "10px",
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    IconButton: {
      disableRipple: true,
    },
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
});

export default function TimeTables() {
  const { currentUser, activeUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [deleteTimetable, setDeleteTimeTable] = useState();
  const [open, setOpen] = React.useState(false);
  const styles = useStyles1();
  const classes = useStyles();
  const toast = Toast();
  useEffect(() => {
    
    const query = {
      method: "GET",
      url: "http://localhost:8080/api/timetables/bybody",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + currentUser.token,
      },
      params: {
        userId: currentUser.id,
      },
    };
    const times = async () =>
      await axios(query)
        .then((res) => {
          console.log(res.data);
          setTimetable(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    times();
  }, [currentUser.id, currentUser.token, formFields]);
  const [timetable, setTimetable] = useState([]);

  const [openPopUp, setOpenPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const handleSave = () => {
    console.log("save");
    setOpen(false);
  };

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
    selected,

    isActive,
  } = formFields;
  const types = [
    { id: "snap", label: "Snap", onChange: false },
    { id: "queue", label: "Queue", onChange: false },
    { id: "line", label: "Line", onChange: false },
  ];
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    gender: "",
    departmentId: "",
    hireDate: new Date(),
    isPermanent: false,
  });

  const abrirCerrarModalEditar = () => {
    console.log(consolaSeleccionada);
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    console.log("Aqui");
    setOpenPopUp(!openPopUp);
  };
  const handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const timetable = {
      userId: 1,
      day: selected.toLowerCase(),
      hour: moment(hour).format("HH:mm"),
    };

    if (selected === "" || hour === "") {
      toast.fire({
        icon: "error",
        title: "Please select the hour and day",
      });
    } else {
      console.log(currentUser);
      const query = {
        method: "POST",
        url: "http://localhost:8080/api/timetables/",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + currentUser.token,
        },
        data: {
          userId: currentUser.id,
          day: selected.toLowerCase(),
          hour: moment(hour).format("HH:mm"),
        },
      };

      await axios(query)
        .then((response) => {
          console.log(response.data.timetable);

          toast.fire({
            icon: "success",
            title: "Created successfully",
          });
          setFormFields(defaultFormFields);
        })
        .catch((error) => {
          //console.log(error.response.data)
          toast.fire({
            icon: "error",
            title: "The schedule already has been asigned",
          });
          setFormFields(defaultFormFields);
        });
    }
    handleClickVariant("success");
    //setFormFields(defaultFormFields);
  };



  const deleteTimeTables = async() => {
    // setTimeout(fetchMyAPI,3000);
    const query = {
      method: "GET",
      url: "http://localhost:8080/api/timetables/byday",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + currentUser.token,
      },
      params: {
        userId: currentUser.id,
        day: deleteTimetable[0],
        hour: deleteTimetable[1],
      },
    };

    await axios(query)
      .then(async(response) => {
      
        if(response.data.timetable){
          const query = {
            method: "DELETE",
            url: "http://localhost:8080/api/timetables/"+response.data.timetable[0].id,
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + currentUser.token,
            },
            // params:{
            //   id:response.data.timetable[0].id
            // }
            // params: {
            //   userId: currentUser.id,
            //   day: deleteTimetable[0],
            //   hour: deleteTimetable[1],
            // },
          };
      
          await axios(query)
            .then((response) => {
              console.log(response)
              toast.fire({
                icon: "success",
                title: "Deleted successfully",
              });
              setFormFields(defaultFormFields);
              const query = {
                method: "GET",
                url: "http://localhost:8080/api/timetables/bybody",
                headers: {
                  // "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + currentUser.token,
                },
                params: {
                  userId: currentUser.id,
                },
              };
              const times = async () =>
                await axios(query)
                  .then((res) => {
                    console.log(res.data);
                    setTimetable(res.data);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              times();
            })
            .catch((error) => {
              console.log(error)
              toast.fire({
                icon: "success",
                title: "Deleted successfully",
              });
             setFormFields(defaultFormFields);
            });
          
        }
        setFormFields(defaultFormFields);
      })
      .catch((error) => {
        //console.log(error.response.data)
        toast.fire({
          icon: "error",
          title: "The schedule already has been asigned",
        });
       // setFormFields(defaultFormFields);
      });
      setFormFields(null);
      setFormFields(defaultFormFields);
    setOpenPopUp(false);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);

    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };
  const columns = [
    { field: "monday", headerName: "Monday", width: 200 },
    { field: "tuesday", headerName: "Tuesday", width: 200 },
    { field: "wednesday", headerName: "Wednesday", width: 200 },
    { field: "thursday", headerName: "Thursday", width: 200 },
    { field: "friday", headerName: "Friday", width: 200 },
    { field: "saturday", headerName: "Saturday", width: 200 },
    { field: "sunday", headerName: "Sunday", width: 200 },
  ];

  return (
    <ThemeProvider theme={themeP}>
      <SnackbarProvider maxSnack={3}>
        <Container>
          <Box sx={{ width: "auto", marginTop: 3, marginBottom: 10 }}>
            <Paper elevation={3}>
              <h1>Timetables Management</h1>
            </Paper>
            <form onSubmit={onSubmit}>
              <Box sx={{ width: "auto", marginTop: 3, marginBottom: 0, pl: 3 }}>
                <h2>Select the timetable for the post:</h2>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{ paddingBlock: "justify", alignContent: "center" }}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ padding: 4, paddingTop: 3, paddingBotton: 0 }}
                >
                  <Item>
                    <Select
                      id='outlined-basic'
                      label='Select the day'
                      name='selected'
                      fullWidth
                      variant='outlined'
                      value={selected}
                      onChange={handleChange}
                      options={[
                        { name: "Monday" },
                        { name: "Tuesday" },
                        { name: "Wednesday" },
                        { name: "Thursday" },
                        { name: "Friday" },
                        { name: "Saturday" },
                        { name: "Sunday" },
                      ]}
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
                    <DateTimePicker
                      name='hour'
                      label='Hour'
                      value={hour}
                      onChange={handleChange}
                      required
                    ></DateTimePicker>
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
                    text='Add Timetable'
                    startIcon={<SendIcon />}
                  ></Button>
                </Grid>
              </Grid>
            </form>
            <Divider sx={{ marginBotton: 5 }} />
            <Grid container sx={{ alignContent: "right", paddingBottom: 10 }}>
              <Grid xs={12} md={12} lg={12}>
                <Paper className={classes.pageContent}>
                  {/*<EmployeeForm />*/}
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ textAlign: "right", margin: "15px" }}
                    >
                      {/* <Tooltip title='Add a new employee'>
                        <IconButton onClick={() => setOpenPopUp(true)}>
                          <PersonAddRoundedIcon
                            //onMouseOver={() => alert("Add New Client")}

                            fontSize='large'
                            sx={{ color: "blue" }}
                          ></PersonAddRoundedIcon>
                        </IconButton>
                      </Tooltip> */}
                    </Grid>
                  </Grid>
                  <Grid>
                    <Item xs={12} md={1.5} lg={1.5}>
                      <div style={{ height: 400, width: "auto" }}>
                        <DataGrid
                          rows={Array.from(timetable)}
                          onCellClick={(params, event) => {
                            console.log(params);
                            if(params.value!==""){
                            setDeleteTimeTable([params.field, params.value])
                            abrirCerrarModalEliminar();}
                            if (!event.ctrlKey) {
                              event.defaultMuiPrevented = true;
                            }
                          }}
                          columns={columns}
                        />
                      </div>
                    </Item>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <PopUp
            title='Employee Form'
            openPopUp={openPopUp}
            setOpenPopUp={setOpenPopUp}
          >
            <div className={styles.modal}>
              {deleteTimetable?<p style={{padding:"5px",paddingBottom:"0px"}}>Do you want to delete the timetable on {deleteTimetable[0]} at {deleteTimetable[1]}? </p>:""}
              <div align='right' style={{ padding: "5px" }}>
                <Button
                  color='secondary'
                  sx={{ height: "40px", width: "80px" }}
                  text='Delete'
                  onClick={() => {deleteTimeTables()}}
                />
              </div>
            </div>
          </PopUp>
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
