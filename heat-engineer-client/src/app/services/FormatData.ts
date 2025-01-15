
function FormatData<T> (data: any): T {
    try{
        return data as T;
    } catch (error){
        throw new Error("Internal server error");
    }
}

export default FormatData;