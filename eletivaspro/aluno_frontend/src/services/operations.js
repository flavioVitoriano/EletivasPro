import api from 'api';



// realiza um post na API
const getAPI = async (url,pk, search) => {
    try {
        const res = await api.get(`${url}${pk}/`, { params: search});
        return [true, res.data];
    } catch (e) {
        if (!e.response.data) return [false, e];
        const errors = e.response.data;
        var formattedErrors = "";

        if (typeof(errors) === "string" ) return [false, errors];

        for (let key in errors) {
            let error = errors[key];
            formattedErrors += `${key} -> ${error[0]}\n`;
        }

        return [false, formattedErrors];
    }
}


// retorna todos
const getAllAPI = async (url, search) => {
    try {
        const res = await api.get(`${url}`, { params: search});
        return [true, res.data];
    } catch (e) {
        if (!e.response.data) return [false, e];
        const errors = e.response.data;
        var formattedErrors = "";

        if (typeof(errors) === "string" ) return [false, errors];

        for (let key in errors) {
            let error = errors[key];
            formattedErrors += `${key} -> ${error[0]}\n`;
        }

        return [false, formattedErrors];
    }
}


// realiza um post na API
const postAPI = async (url, data, params) => {
    var res;
    try {
        if (!params) res = await api.post(url, data);
        else res = await api.post(url, data, params);
        return [true, res];
    } catch (e) {
        if (!e.response.data) return [false, e];
        const errors = e.response.data;
        var formattedErrors = "";

        if (typeof(errors) === "string" ) return [false, errors];

        for (let key in errors) {
            let error = errors[key];
            formattedErrors += `${key} -> ${error[0]}\n`;
        }

        return [false, formattedErrors];
    }
}


// realiza um Update
const patchAPI = async (url, pk, data, params) => {
    var res;
    try {
        if (!params) res = await api.patch(`${url}${pk}/`, data, params);
        else res = await api.patch(`${url}${pk}/`, data, params);
        return [true, res];
    } catch (e) {
        if (!e.response.data) return [false, e];
        const errors = e.response.data;
        var formattedErrors = "";

        if (typeof(errors) === "string" ) return [false, errors];

        for (let key in errors) {
            let error = errors[key];
            formattedErrors += `${key} -> ${error[0]}\n`;
        }

        return [false, formattedErrors];
    }
}


// realiza um delete
const deleteAPI = async (url, pk) => {
    try {
        const res = await api.delete(`${url}${pk}/`);
        return [true, res];
    } catch (e) {
        if (!e.response.data) return [false, e];
        const errors = e.response.data;
        var formattedErrors = "";

        if (typeof(errors) === "string" ) return [false, errors];

        for (let key in errors) {
            let error = errors[key];
            formattedErrors += `${key} -> ${error[0]}\n`;
        }

        return [false, formattedErrors];
    }
}


export { getAPI, createAPI, updateAPI, deleteAPI, getAllAPI };