import axios, { AxiosError } from "axios";

const BACKEND_ORIGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const getAllCategories = async (page: number, filteredData: string[]) => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/category`, {
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
const getSingleProduct = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${BACKEND_ORIGIN_URL}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.data);
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

export { getAllCategories, getSingleProduct };
