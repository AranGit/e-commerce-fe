import { tokenKey, setItemToLocal } from "@/utils/utils"

const baseUrl = "https://dummyjson.com/";
//Auth
const loginUrl = `${baseUrl}auth/login`;
const getUserUrl = `${baseUrl}auth/me`;
//Product
const getAllProductsUrl = `${baseUrl}products`;
const getAllCatgoriesUrl = `${getAllProductsUrl}/categories`;
const getProductByIdUrl = (productID: string) => `${baseUrl}products/${productID}`;
//Cart
const getCartsOfUserUrl = (userId: string) => `${baseUrl}carts/user/${userId}`;
const addANewCartUrl = `${baseUrl}carts/add`;

export interface ErrorResponse {
  message: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  discountPercentage: number;
  thumbnail: string;
  category: string,
  stock: number
  quantity: number
}

export interface ProductToCart {
  id: number;
  quantity: number;
}

export interface Products {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number
}

export interface Carts {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

function mapToCarts(json: any): Carts {
  return {
    carts: json.carts,
    total: json.total,
    skip: json.skip,
    limit: json.limit
  };
}


function mapToError(json: any): ErrorResponse {
  return {
    message: json.message
  };
}

function mapToProduct(json: any): Product {
  return {
    id: json.id,
    title: json.title,
    price: json.price,
    images: json.images ? json.images : [],
    description: json.description,
    discountPercentage: json.discountPercentage,
    thumbnail: json.thumbnail,
    category: json.category,
    stock: json.stock,
    quantity: json.quantity ? json.quantity : 0
  };
}

function mapToProducts(json: any): Products {
  return {
    products: json.products,
    limit: json.limit,
    skip: json.skip,
    total: json.total,
  };
}

function mapToUser(json: any): User {
  return {
    id: json.id,
    username: json.username,
    email: json.email,
    firstName: json.firstName,
    lastName: json.lastName,
    gender: json.gender,
    image: json.image
  };
}

export const GetAllProducts = async ({ setProducts }: { setProducts: any }) => {
  const response = await fetch(getAllProductsUrl + "?limit=0");
  const jsonData = await response.json();
  setProducts(mapToProducts(jsonData));
};

export const GetProductByID = async ({ productID, setProduct }: { productID: string, setProduct: any }) => {
  const response = await fetch(getProductByIdUrl(productID));
  const jsonData = await response.json();
  setProduct(mapToProduct(jsonData));
};

export const GetAllCategories = async ({ setData }: { setData: any }) => {
  const response = await fetch(getAllCatgoriesUrl);
  const jsonData = await response.json();
  setData(jsonData);
};

export const Login = async (
  { username, password, onSuccess, onFailed }:
    {
      username: string,
      password: string,
      onSuccess: any,
      onFailed: any
    }) => {
  const response = await fetch(loginUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
  if (response.ok) {
    const jsonData = await response.json();
    setItemToLocal(tokenKey, jsonData.token);
    onSuccess();
  } else {
    const jsonData = await response.json();
    onFailed(mapToError(jsonData));
  }
};

export const getUser = async (
  { token, onSuccess, onFailed }:
    {
      token: string,
      onSuccess: any,
      onFailed: any,
    }) => {
  const response = await fetch(getUserUrl,
    {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  if (response.ok) {
    const jsonData = await response.json();
    onSuccess(mapToUser(jsonData));
  } else {
    const jsonData = await response.json();
    onFailed(mapToError(jsonData));
  }
};

export const GetCartsOfUser = async (
  { userId, onSuccess, onFailed }:
    {
      userId: number,
      onSuccess: any,
      onFailed: any
    }) => {
  const response = await fetch(getCartsOfUserUrl(userId.toString()));
  if (response.ok) {
    const jsonData = await response.json();
    onSuccess(mapToCarts(jsonData));
  } else {
    const jsonData = await response.json();
    onFailed(mapToError(jsonData));
  }
};

export const AddProductsToCart = async (
  { productsToCart, userId, onSuccess, onFailed }:
    {
      productsToCart: ProductToCart[],
      userId: number,
      onSuccess: any,
      onFailed: any
    }) => {
  const response = await fetch(addANewCartUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        products: productsToCart
      })
    });
  if (response.ok) {
    onSuccess();
  } else {
    const jsonData = await response.json();
    onFailed(mapToError(jsonData));
  }
};
