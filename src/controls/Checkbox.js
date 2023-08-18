import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from "@material-ui/core";
import React from "react";

export default function Checkbox(props) {
  const {id,name, label, value, onChange,...other} = props;

  const convertToDefEventPara= (name, value)=>({
    target: {
      name,value
    }
  })

  return (
    <FormControl>
      <FormControlLabel
          control={
              <MuiCheckbox
              id={id}
              name={name}
              color="primary"
              checked={value}
              onChange={e=>onChange(convertToDefEventPara(name, e.target.checked))}
               {...other}
              />

          }
          label={label}
      />
    </FormControl>
  );
}
