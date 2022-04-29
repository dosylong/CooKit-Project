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
  checkUserEmail: (params) => {
    const url = 'user/email/check';
    return axiosClient.get(url, { params });
  },
  editUserProfile: (data) => {
    const url = 'user/edit/profile';
    return axiosClient.post(url, data);
  },
  editUserAvatar: (data) => {
    const url = 'user/edit/avatar';
    return axiosClient.put(url, data);
  },
};

export default userApi;
