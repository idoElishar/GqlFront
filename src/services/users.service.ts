import axios from "axios";
import { User } from "../component/interface/interface";
// import { useMutation } from "@apollo/client";
// import { DELETE_USER } from "../apolloClient/graphQL_querys";

// const api = import.meta.env.VITE_MY_SERVER;



// export  const deleteAccount = () => {
//     const id = localStorage.getItem('userId')
//     if (!id) {
//         return
//     }
//     const userId = JSON.parse(id)
//     const [deleteUserMutation] = useMutation(DELETE_USER);
  
//     const handleDeleteUser = async () => {
//       try {
//         const { data } = await deleteUserMutation({
//           variables: { id: userId },
//         });
  
//         // Handle successful deletion, if needed
//         console.log('User deleted:', data.deleteUser);
//       } catch (error:any) {
//         // Handle error
//         console.error('Error deleting user:', error.message);
//       }
      
//     }
// handleDeleteUser};

 export const deleteAccountt = async (showModal: (message: string) => void) => {
    const id = localStorage.getItem('userId')
    if (!id) {
        return
    }
    const userId = JSON.parse(id)

    const query = `
        mutation DeleteUser {
            deleteUser(id: "${userId}") {
                _id
                username
                email
            }
        }
    `;

    try {
        const response = await axios.post(`http://localhost:4000/graphql`, { query });
        if (response) {
            console.log(response);
            showModal('User successfully deleted');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            showModal(error.response.data.message);
        }
    }
};
export const fetchUserById = async () => {
    try {
        const id = localStorage.getItem('userId');
        if (id) {
            const userId = JSON.parse(id);
            const query = `
                query GetUserById($id: String!) {
                    getUserById(id: $id) {
                        _id
                        username
                        email
                        password
                        isAdmin
                    }
                }
            `;
            const response = await axios.post('http://localhost:4000/graphql/', {
                query,
                variables: { id: userId }
            });

            const result = {
                message: "User retrieval successful",
                success: true,
                user: response.data.data.getUserById
            };

            console.log(result);
            return result;
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return {
            message: "Error fetching user details",
            success: false,
            error: error
        };
    }
};

export const handleUpdateUserData = async (userData:User) => {
    try {
        const id = localStorage.getItem('userId');
        if (id) {
            const userId = JSON.parse(id);
            const query = `
                mutation UpdateUserById($id: ID!, $updatedUserData: NewUserInput!) {
                    updateUserById(id: $id, updatedUserData: $updatedUserData) {
                        success
                        message
                        user {
                            _id
                            username
                            email
                            password
                            isAdmin
                        }
                    }
                }
            `;
            const variables = {
                id: userId,
                updatedUserData: {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    isAdmin: userData.isAdmin
                }
            };
            const response = await axios.post('http://localhost:4000/graphql/', {
                query,
                variables
            });
            localStorage.setItem('username', JSON.stringify(userData.username));
            console.log(response.data.data.updateUserById);
            return response.data.data.updateUserById;
        }
    } catch (error) {
        console.error('Error updating user details:', error);
    }
};
