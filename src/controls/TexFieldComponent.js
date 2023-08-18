import React from 'react'
import TextField from "@mui/material/TextField";

export default function TexFieldComponent(props) {
    const {id,name, label, value, type, onChange, ...other} = props;
  return (
    <TextField
            id={id}
            label={label}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
          />
  )
}
