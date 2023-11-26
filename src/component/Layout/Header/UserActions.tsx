import { useState } from 'react';
import {
  IconButton,Menu,MenuItem,Typography,useTheme} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const api = import.meta.env.VITE_MY_SERVER;


const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const Navigate = useNavigate();
  const id =  localStorage.getItem('userId')
  let userId: string 
  if (id) {
     userId = JSON.parse(id)
  }
  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditProfile =() => {
    

    handleCloseMenu();
  };

  const handleDeleteAccount = async() => {
    try {
      const response = await axios.delete(`${api}/api/users/delete/${userId}`);
      if (response) {  
        window.alert('User successfully deleted')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        Navigate('/')
      }

    } catch (error:any) {
      window.alert(error.response.data.message)}
    handleCloseMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    Navigate('/');
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ color: 'inherit' }}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditProfile}>
          <EditIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Edit Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteAccount}>
          <DeleteIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Delete Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile
