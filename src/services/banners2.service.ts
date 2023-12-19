import axios from "axios";
import { ChangePassword, User, UserData } from "../component/interface/interface";
const api = import.meta.env.VITE_MY_SERVER;

export const searchBanner = async (searchQuery: string) => {
    try {
        const response = await axios.get(`${api}/banners?search=${searchQuery}`);
        if (!Array.isArray(response.data)) {
            throw new Error("Response is not an array");
        }
        const searchItems = response.data.map((banner) => ({
            label: banner.image.alt,
            id: banner._id,
        }));
        return searchItems;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

export const allBannersForSearch = async () => {
    try {
        const response = await axios.get(`${api}/banners`);
        if (!Array.isArray(response.data)) {
            throw new Error("Response is not an array");
        }
        const searchItems = response.data.map((banner) => ({
            label: banner.image.alt,
            id: banner.id,
        }));
        return searchItems;
    } catch (error) {
        console.error("Error fetching initial search results:", error);
    }
}

export const getBanner = async (id: string) => {
    try {
        const response = await axios.get(`${api}/banners/${id}`);
        const banner = response.data;
        return banner;
    } catch (error) {
        console.error("Error fetching banner:", error);
    }
}

export const updatePassword = async (obj: ChangePassword) => {
    try {
        const response = await axios.put(`${api}/users/changepassword`, obj);
        return response;
    } catch (error) {
        console.error("Error during Change password:", error);
    }
}

export const PostLogIn = async (userData: UserData) => {
    const response = await axios.post(
        `${api}/users/login`,
        userData
    );
    if (response.data) {
        localStorage.setItem('username', JSON.stringify(response.data.user.username))
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('userId', JSON.stringify(response.data.user._id))
    }
}

export const PostSignIn = async (user: User) => {
    const response = await axios.post(` ${api}/users/register`, user);
    return response;
}

export const getAllBanners = async () => {
    try {
        const response = await axios.get(`${api}/banners`);
        return response.data;
    } catch (err) {
        console.error("Error fetching banners:", err);

    }
}

export const getAllProducts = async () => {
    const response = await axios.get(`${api}/products`);
    return response.data;
}