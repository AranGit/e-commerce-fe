export const tokenKey = "token";

export const setItemToLocal = (key: string, value: string) => localStorage.setItem(key, value);
export const getItemFromLocal = (key: string) => localStorage.getItem(key);
export const clearItemInLocal = (key: string) => localStorage.removeItem(key);

export function isUniqueFromArray(arr: any, value: any) {
    return !arr.includes(value);
}
