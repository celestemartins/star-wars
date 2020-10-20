// Structure data by id to better access 
// (we are using name as id because it's the key in the API)
export default(data) => {
    const modelated = {};
    data.forEach((d) => {
    modelated[d.name] = { ...d };
    });
    return modelated;
}