import React from 'react'
import { Button as MuiButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme=>({
   
    root:{
        margin:theme.spacing(0.5),
        position:'relative',
        height: 100,
        alignSelf:'right',
        color:'white',
        backgroundColor:"#2C497F"
    },
    label:{
        textTransform: 'none'
    },
}))

export default function Button(props) {
    const {text, size, color, variant, onClick, ...other} = props;
    //const classes= useStyles();

  return (
      <MuiButton
          variant={variant ||"contained"}
          size={size ||"large"}
          color={color||"primary"}
          onClick={onClick}
          //classes={{root: classes.root, label: classes.label}}
          {...other}
      >
          {text}
      </MuiButton>
  )
}
