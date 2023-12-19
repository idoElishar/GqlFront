import { useState, useEffect } from 'react';
import {Button,TextField,Dialog,DialogTitle,DialogContent,DialogActions,} from '@mui/material';
import { fetchUserById, handleUpdateUserData } from '../../../services/users.service';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '../../../apolloClient/graphQL_querys';

const EditUser = () => {
    const [updateUserMutation, { loading, error }] = useMutation(UPDATE_USER_MUTATION);

    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [userData, setUserData] = useState({
        _id: '',
        username: '',
        email: '',
        password: '',
        isAdmin:true,
    });

    async function getUser() {
        const data = await fetchUserById();
        if (data) setUserData(data.user);
      }
    
    useEffect(() => {
        getUser();
    }, []);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

        const handleSaveUserData = async () => {
            try {
              const { data } = await updateUserMutation({
                variables: {
                  id,
                  updatedUserData,
                },
              });
        
              console.log('User updated:', data?.updateUserById);
            } catch (error) {
              console.error('Error updating user:', error.message);
            }
          };
        

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Edit Your Details</DialogTitle>
                <DialogContent>
                    <TextField sx={{marginBottom: "15px", marginTop: "15px"}}
                        label="User name"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField sx={{marginBottom: "15px"}}
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField sx={{marginBottom: "15px"}}
                        type="password"
                        label="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUserData} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default EditUser;
