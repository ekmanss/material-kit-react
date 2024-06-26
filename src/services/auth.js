import axios from 'axios';

const API_URL = 'http://localhost:6060/auth/';

const register = (username, email, password) => axios.post(`${API_URL  }signup`, {
    username, email, password,
  });

const login = (username, password) =>
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

  // 模拟成功的登录响应
   new Promise((resolve) => {
    setTimeout(() => {
      const mockUser = {
        id: 1,
        username,
        email: `${username}@example.com`,
        roles: ['ROLE_USER'],
        accessToken: 'mock-jwt-token',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      resolve({ code: 200, data: mockUser });
    }, 500); // 模拟网络延迟
  })
;

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