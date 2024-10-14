import axios, { AxiosError } from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const getSingleImage = async (id: number) => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/image/${id}`);

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

const getImagesUrl = async (page: number, filteredData: string[]) => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/image`, {
      params: { page, categories: filteredData.join(",") },
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
    return {
      success: false,
      data: err.response?.data || "An error occurred",
      status: err.response?.status || 500,
    };
  }
};

export { getSingleImage, getImagesUrl };
