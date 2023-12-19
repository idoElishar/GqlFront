import axios, { AxiosError } from "axios";
import { User } from "../component/interface/interface";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../apolloClient/graphQL_querys";

const api = import.meta.env.VITE_MY_SERVER;


export  const deleteAccount = () => {
    const id = localStorage.getItem('userId')
    if (!id) {
        return
    }
    const userId = JSON.parse(id)
    const [deleteUserMutation] = useMutation(DELETE_USER);
  
    const handleDeleteUser = async () => {
      try {
        const { data } = await deleteUserMutation({
          variables: { id: userId },
        });
  
        // Handle successful deletion, if needed
        console.log('User deleted:', data.deleteUser);
      } catch (error:any) {
        // Handle error
        console.error('Error deleting user:', error.message);
      }
      
    }
handleDeleteUser};

const deleteAccountt = async (showModal: (message: string) => void) => {
    const id = localStorage.getItem('userId')
    if (!id) {
        return
    }
    const userId = JSON.parse(id)

    try {
        const response = await axios.delete(`${api}/users/delete/${userId}`);
        if (response) {
            showModal('User successfully deleted')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            localStorage.removeItem('token')
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            showModal(error.response?.data.message)
        }
    }
};

export const fetchUserById = async () => {
    try {
        const id = localStorage.getItem('userId');
        if (id) {
            const userId = JSON.parse(id);
            const response = await axios.get(`${api}/users/${userId}`)
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

export const handleUpdateUserData = async (userData: User) => {
    try {
        const id = localStorage.getItem('userId');
        if (id) {
            const userId = JSON.parse(id);
            const response = await axios.put(`${api}/users/update/${userId}`, {
                "username": userData.username,
                "email": userData.email,
                "password": userData.password,
                "isAdmin": userData.isAdmin
            })
            localStorage.setItem('username', JSON.stringify(userData.username))
            return response.data
        }
    } catch (error) {
        console.error('Error updating user details:', error);
    }
};

