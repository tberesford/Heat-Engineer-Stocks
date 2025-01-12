import axios from "axios";

const Fetch = async (url: string) => {
    const response = await axios.get(url);
    try{
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