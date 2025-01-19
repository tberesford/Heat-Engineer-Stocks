import axios from "axios";

const Fetch = async (url: string) => {
    try{
        const response = await axios.get(url);
        if(response.status == 200){
            return response;
        } else {
            throw new Error("Internal Server Error");
        }
    } catch (error) {
        throw new Error("Failed to fetch stock");
    } 
}

export default Fetch;