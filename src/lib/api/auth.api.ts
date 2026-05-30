import api from "../axios";

// ================= SEND SIGNUP OTP =================
export const sendSignupOtp =
  async (data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
  }) => {
    const response = await api.post(
      "/auth/send-signup-otp",
      data
    );

    return response.data;
  };

// ================= VERIFY SIGNUP OTP =================
export const verifySignupOtp =
  async (data: {
    email: string;
    otp: string;
  }) => {
    const response = await api.post(
      "/auth/verify-signup-otp",
      data
    );

    return response.data;
  };

// ================= SIGNUP =================
export const signupUser = async (data: {
  name: string;
  email: string;
  mobile: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/signup",
    data
  );

  return response.data;
};

// ================= LOGIN =================
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (data: {
  email: string;
}) => {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};

// ================= VERIFY RESET OTP =================
export const verifyResetOtp = async (data: {
  email: string;
  otp: string;
}) => {
  const response = await api.post(
    "/auth/verify-reset-otp",
    data
  );

  return response.data;
};

// ================= RESET PASSWORD =================
export const resetPassword = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};