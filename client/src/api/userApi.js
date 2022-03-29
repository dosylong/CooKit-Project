import axiosClient from './axiosClient';

const userApi = {
  createUser: (data) => {
    const url = 'user/create';
    return axiosClient.post(url, data);
  },
  getUserProfile: (params) => {
    const url = 'user/profile';
    return axiosClient.get(url, { params });
  },
};

export default userApi;
