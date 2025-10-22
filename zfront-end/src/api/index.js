import axios from "axios";

export const AdminApi = axios.create({ baseURL: "http://localhost:8000" });
export const ProductApi = axios.create({ baseURL: "http://localhost:8001" });
export const UserApi = axios.create({ baseURL: "http://localhost:8002" });
export const OrderApi = axios.create({ baseURL: "http://localhost:8003" });
