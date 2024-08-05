import axios from 'axios';

const url = process.env.REACT_APP_BACKEND_URI;

export const apiPost = (path, data, { headers, ...conf }, auth = true) => {
    const Authorization = auth && `Bearer ${localStorage.getItem("token")}`;

    const config = {
        ...conf,
        headers: {
            Authorization,
            ...(headers ? headers : {}),
        },
    };
    return axios.post(`${url}${path}`, data, config);
};