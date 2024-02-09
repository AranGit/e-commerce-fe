const getAllProductsUrl = 'https://dummyjson.com/products';
const getProductByID = (productID: string) => `https://dummyjson.com/products/${productID}`

export interface Product {
    id: number;
    title: string;
    price: number;
    images: string[];
    description: string;
}

export interface Products {
    products: Product[];
    limit: number;
    skip: number;
    total: number;
}

export function mapToProduct(json: any): Product {
    return {
        id: json.id,
        title: json.title,
        price: json.price,
        images: json.images,
        description: json.description
    };
}

export function mapToProducts(json: any): Products {
    return {
        products: json.products,
        limit: json.limit,
        skip: json.skip,
        total: json.total,
    };
}

export const GetAllProducts = async ({ setProducts }: { setProducts: any }) => {
    const response = await fetch(getAllProductsUrl);
    const jsonData = await response.json();
    setProducts(mapToProducts(jsonData));
};

export const GetProductByID = async ({ productID, setProduct }: { productID: string, setProduct: any }) => {
    const response = await fetch(getProductByID(productID));
    const jsonData = await response.json();
    setProduct(mapToProduct(jsonData));
};
