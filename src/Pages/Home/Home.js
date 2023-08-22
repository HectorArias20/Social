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
import { Container } from "./Home.styled";
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
export default function Home() {
  const[status, setStatus] =useState();;
  const { currentUser, activeUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [deleteTimetable, setDeleteTimeTable] = useState();
  const [open, setOpen] = React.useState(false);
  const styles = useStyles1();
  const classes = useStyles();
  const toast = Toast();
  const [publishing, setPublishing] = useState([]);

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
  useEffect(() => {
    console.log("====================================");
    console.log(status);
    console.log("====================================");
    const query = {
      method: "GET",
      url:
        "http://localhost:8080/api/publishings/user/" +
        currentUser.id +
        "?status=" +status,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + currentUser.token,
      },
    };
    const times = async () =>
      await axios(query)
        .then((res) => {
          console.log(res.data.publishings);
          setPublishing(res.data.publishings);
        })
        .catch((err) => {
          console.error(err);
        });
    times();
  }, [currentUser.id, currentUser.token, formFields, status]);

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
    console.log(event.target.value);
    if (event.target.value === "Pending") {
        setStatus("pending");
      // console.log('*********************');
      // console.log(status);
      // console.log('*********************');
    }else{
      setStatus("");
    }
    //if (event.target.value !== "Pending") status = "";
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

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "day", headerName: "Date", width: 200 },
    { field: "hour", headerName: "Hour", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  return (
    <SnackbarProvider maxSnack={3}>
      <Container>
        <Box sx={{ width: "auto", marginTop: 3, marginBottom: 10 }}>
          <Paper elevation={3}>
            <h1>Publishings Queue</h1>
          </Paper>
          <Box sx={{ width: "auto", marginTop: 3, marginBottom: 0, pl: 3 }}>
            <h2>Select the type of search</h2>
          </Box>
          <RadioGroup
            aria-label='platform'
            defaultValue='Website'
            overlay={true}
            name='type'
            value={type}
            onChange={handleChange}
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
              {["History", "Pending"].map((value, index) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={6}
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
          <Divider sx={{ marginBotton: 5 }} />
          <ThemeProvider theme={themeP}>
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
                    </Grid>
                  </Grid>
                  <Grid>
                    <Item xs={12} md={1.5} lg={1.5}>
                      <div style={{ height: 400, width: "auto" }}>
                        <DataGrid
                          rows={Array.from(publishing)}
                          onCellClick={(params, event) => {
                            console.log(params);
                            if (params.value !== "") {
                              setDeleteTimeTable([params.field, params.value]);
                              abrirCerrarModalEliminar();
                            }
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
          </ThemeProvider>
        </Box>
      </Container>
    </SnackbarProvider>
  );
}
