const createFormdata = (data = {}, method = null) => {
    const formData = new FormData();
    // if need to put _method attribute
    method && formData.append("_method", method);

    // append each element
    for (const key in data) {
        // when input value is an array
        if (Array.isArray(data[key])) {
            for (const i in data[key]) {
                formData.append(`${key}[${i}]`, data[key][i]);
            }
        } else if (data[key]) {
            // if element is not null and not an array
            formData.append(key, data[key]);
        }
    }

    return formData;
};

export default createFormdata;
