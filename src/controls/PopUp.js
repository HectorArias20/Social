import { Dialog, DialogContent, DialogTitle, ThemeProvider, Typography } from '@material-ui/core'
import React from 'react'
import Controls from './Controls';
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@mui/material';

const useStyles =makeStyles(theme=>({
    dialogWrapper: {
        //padding: theme.spacing(2),
        position:'absolute',
        //top: theme.spacing(2)
    },
    dialogTitle:{
        paddingRight:"0px"
    }

}))

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
export default function PopUp(props) {
    const {title, children, openPopUp, setOpenPopUp} = props
    const classes= useStyles();

  return (
    
    <Dialog open={openPopUp} maxWidth="md" classes={{paper:classes.dialogWrapper}}>
        <DialogTitle title={title} className={classes.dialogTitle}>
            <div style={{display:"flex"}}>
                <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>{title}</Typography>
                <Controls.ActionButton
                        onClick={()=>{setOpenPopUp(false)}}
                        color="secondary"><CloseIcon></CloseIcon></Controls.ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers style={{display:"flex", height:"100px", width:"400px", border:"0px"}}>
            {children}
        </DialogContent>
    </Dialog>
    
  )
}
