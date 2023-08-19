import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { AdapterDateFns } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
      <TimePicker
        label={label}
        inputFormat="HH:mm"
        value={value}
        onChange={date=>onChange(convertToDefEventPara(name, date))}
        renderInput={(params) => <TextField {...params} />}
        required
      />
    </Stack>
    </LocalizationProvider>
  )
}