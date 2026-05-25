import api from "../axios";

export const generatePreferences = async (data: any) => {
  const response = await api.post(
    "/preferences/generate",
    data
  );

  return response.data;
};