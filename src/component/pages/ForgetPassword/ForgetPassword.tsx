import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle"; import React from "react";
import { useState } from "react"
import { validatePassword, validateEmail } from "../log-in/functions";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updatePassword } from "../../../services/banners2.service";

export default function ForgetPassword() {

  const Navigate = useNavigate()
  const ls = localStorage.getItem("email")
  const [status ,setStatus] = useState("")
  const [obj, setObg] = useState({
    email: ls ? JSON.parse(ls) : "",
    newPassword: ''
  })
  const [showPassword ,setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  

  const changePassword = async () => {
    setEmailError("");
    setPasswordError("");

    if (!obj.email) {
      setEmailError("Email is required");
      return;
    }

    if (!obj.newPassword) {
      setPasswordError("Password is required");
      return;
    }

    if (!validateEmail(obj.email)) {
      setEmailError("Invalid email");
    }

    if (!validatePassword(obj.newPassword)) {
      setPasswordError("Invalid password format");
      return;
    }

    try {
      const response = await updatePassword(obj);
      if (response?.data.message == "Verification email sent. Please check your email to confirm password change.") {
        setStatus(response.data.message)
      }

      else {
        setStatus('try again');
      }
    } catch (error:unknown) {
      if(error instanceof AxiosError)
      if (error.response?.data.message == "User not found") {
        setStatus(error.response?.data.message);
      } else {
        console.error("Error during Change password:", error);
      }
    }
  }

  return (
    <React.Fragment >
      <Dialog sx={{
        backgroundImage: 'url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)',
        backgroundSize: 'cover'
      }} open={true} >
        <DialogTitle>forget password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            enter new password
          </DialogContentText>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setObg((prevData) => ({
                ...prevData,
                email: e.target.value,
              }));
              setEmailError("");
            }}
            value={obj.email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setObg((prevData) => ({
                ...prevData,
                newPassword: e.target.value,
              }));
              setPasswordError("");
            }}
            value={obj.newPassword}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="standard"
            required
            error={Boolean(passwordError)}
            helperText={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        {status &&
        <DialogContentText sx={{ color: status === "Verification email sent. Please check your email to confirm password change." ? "green" : "red", marginLeft: "20px" }}>
               {status}
             </DialogContentText>}
        <DialogActions>
        <Button onClick={()=>Navigate('/banner/')}> back </Button>
          <Button onClick={changePassword}>Change password</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}