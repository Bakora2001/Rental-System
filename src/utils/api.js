import axios from "axios"
import { api_url } from "./constants";

export default axios.create({
    baseUrl: api_url,
});
