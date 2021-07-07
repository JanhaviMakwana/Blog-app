import axios from "../axios";

const AuthService = {
    login: (data) => {
        return axios.post('/login', data)
            .then(({ data }) => {
                setHeaderAndStorage(data);
                return data.user;
            })
            .catch(err => {
                throw new Error(err.response.data.message);
            });
    },
    signup: (data) => {
        return axios.post('/signup', data)
            .then(({ data }) => {
                setHeaderAndStorage(data);
                return data.user;
            })
            .catch(err => {
                throw new Error(err.response.data.message)
            });
    }
};


const setHeaderAndStorage = ({ user, token }) => {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export default AuthService;