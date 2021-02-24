const ConcatName = (data) => {
    if (data.firstname && !data.lastname) return data.firstname
    if (data.lastname && !data.firstname) return data.lastname
    if (data.firstname && data.lastname) return data.firstname + ' ' + data.lastname
}
export default ConcatName