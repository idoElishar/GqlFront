export interface Banner {
  _id: string;
  id: number
  image: {
    url: string;
    alt: string;
  };
  text: string;
  createdAt: Date;
  author: string;
  category: string;
  rating: number;
  sale?: number;
  productID: number;
}

export interface BannerFormData {

  id?: number;
  image: {
    url: File | null;
    alt: string;
  };
  text: string;
  createAt: Date;
  author: string;
  rating: number;
  sale: number;
  category: string;
  productID?: number;
}

export interface User {
  _id?: string
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Product {
  [x: string]: any;
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  clickCount: number;
  quantity: number;
  attributes: Attributes[];
}

export interface Attributes {
  key: string;
  value: number | string;
}

export interface SearchResult {
  label: string;
  id: string;
}

export interface EditRequestData {
  id: number | undefined;
  image: {
    url: string;
    alt: string;
  };
  text: string;
  createAt: Date;
  author: string;
  rating: number;
  sale: number;
  category: string;
  productID: number | undefined
}

export interface AddRequestData {
  id: number | undefined;
  image: {
    url: string | ArrayBuffer | null;
    alt: string;
  };
  text: string;
  createAt: Date;
  author: string;
  rating: number;
  sale: number;
  category: string;
  productID: string | undefined;
}

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

export interface ModalInterface {
  open: boolean;
  message: string;
  onClose: () => void;
}

export interface ClickData {
  _id: string;
  banner_id: string;
  clicks?: { [key: string]: number };
}

export interface ChartData {
  banner_id: string;
  clicks: number;
}

export interface ChartData2 {
  date: string;
  clicks: number;
}

export interface Banner2 {
  image: { alt: string };
  sale: number;
}

export interface Click {
  date: string;
  count: number;
}

export interface ClickData3 {
  _id: string;
  banner_id: string;
  clicks: Click[];
}

export interface ChangePassword {
  email: string;
  newPassword: string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface BannerSlice{
  banners:Banner[]
  status:string
  error:string
}

export interface ProductSlice{
  products:Product[]
  status:string
  error:string
}