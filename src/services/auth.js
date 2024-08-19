import axios from 'axios';

const API_URL = 'http://localhost:6868/auth/';

const register = (username, email, password) => axios.post(`${API_URL}signup`, {
  username, email, password,
});

const login = (username, password) => new Promise((resolve, reject) => {
  // return axios
  //     .post(API_URL + "signin", {
  //         username,
  //         password,
  //     })
  //     .then((response) => {
  //         console.log("login response", response);
  //         const { code, data } = response.data;
  //         if (data.username) {
  //             localStorage.setItem("user", JSON.stringify(data));
  //         }
  //         return { code, data };
  //     });

  setTimeout(() => {
    if (Math.random() < 1) {  // 80% 成功率
      const mockUser = {
        id: 1, username, email: `${username}@example.com`, roles: ['ROLE_USER'], accessToken: 'mock-jwt-token',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      resolve({ code: 200, data: mockUser });
    } else {
      // 使用 Error 对象来 reject
      reject(new Error('Invalid username or password'));
    }
  }, 500); // 模拟网络延迟
});

const logout = () => {
  localStorage.removeItem('user');
  // return axios.post(API_URL + "signout").then((response) => {
  //     return response.data;
  // });
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const AuthService = {
  register, login, logout, getCurrentUser,
};

export default AuthService;