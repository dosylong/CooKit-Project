import axiosClient from './axiosClient';

const recipeApi = {
  createRecipe: (data) => {
    const url = 'recipe/create';
    return axiosClient.post(url, data);
  },
  getMyRecipe: () => {
    const url = 'recipe/get/my';
    return axiosClient.get(url);
  },
  getAllRecipe: (params) => {
    const url = 'recipe/get/all';
    return axiosClient.get(url, { params });
  },
  getRecipeDetail: (params) => {
    const url = 'recipe/get/detail';
    return axiosClient.get(url, { params });
  },
  createRecipeImage: (data) => {
    const url = 'recipe/create/image';
    return axiosClient.post(url, data);
  },
};

export default recipeApi;
