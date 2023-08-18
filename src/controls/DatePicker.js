import { Stack } from '@mui/material'
// import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import React from 'react'
// import { TextField } from '@material-ui/core';
// //import { AdapterDateFns } from "mui/x-date-pickers/AdapterDateFns";
// //import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { AdapterDateFns } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateAdapter from "@mui/lab/AdapterDateFns";

export default function DateTimePicker(props) {

    const {name,label, value, onChange}=props;

    const convertToDefEventPara= (name, value)=>({
        target: {
          name,value
        }
      })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={3}>
      <DatePicker
        label={label}
        inputFormat="dd/MM/yyyy"
        value={value}
        onChange={date=>onChange(convertToDefEventPara(name, date))}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
    </LocalizationProvider>
  )
}
