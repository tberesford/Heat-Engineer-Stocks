
function ValidateStockData<T> (data: any): T {
    try {
        return data as T;
    } catch (error) {
        throw new Error("Data not in correct format");
    }
}

export default ValidateStockData;