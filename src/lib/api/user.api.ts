import api from "../axios";

// PROFILE
export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/user/profile", data);
  return res.data;
};

// JOSAA
export const getJosaa = async () => {
  const res = await api.get("/user/josaa");
  return res.data;
};

export const addJosaa = async (data: any) => {
  const res = await api.post("/user/josaa", data);
  return res.data;
};

// CSAB
export const getCsab = async () => {
  const res = await api.get("/user/csab");
  return res.data;
};

export const addCsab = async (data: any) => {
  const res = await api.post("/user/csab", data);
  return res.data;
};