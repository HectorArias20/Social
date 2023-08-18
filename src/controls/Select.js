import React from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';

export default function Select(props) {

    const {name, label, value, error=null,  onChange, options}= props;
  return (
    <FormControl
      variant="filled"
      {...(error && {error:true})}
      fullWidth
      >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        
        >
      {/* <MenuItem value="">None</MenuItem> */}
      {
        options.map((item)=>(<MenuItem  key={item.name} value={item.name}>{item.name}</MenuItem>))
      }
      </MuiSelect>
    {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
