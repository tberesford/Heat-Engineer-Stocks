
function FormatData<T> (data: any): T {
    try{
        return data as T;
    } catch (error){
        throw new Error("Unexpected data");
    }
}

export default FormatData;