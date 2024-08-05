import { cancelTokenSources, fetchAuthWrapper, fetchBaseWrapper } from "../../pages/utils/fetchWrapper/fetchWrapper";


export const authService = {

  login: async (credentials) => {
    try {
      const response = await fetchAuthWrapper.post("/login", credentials);
      sessionStorage.setItem("token", response?.data?.access);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  staffRegister: async (credentials) => {
    try {
      const response = await fetchBaseWrapper.post("/register-invited-user/", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (payload) => {
    try {
      const response = await fetchAuthWrapper.post("/forgotpassword/", payload);
      return response;
    } catch (error) {
    }
  },

  getUserProfile: async () => {
    try {
      const response = await fetchAuthWrapper.get("/me/");
      return response;
    } catch (error) {
    }
  },

  updateUserProfile:async (userId, monoId) => {
    try {
      const response = await fetchAuthWrapper.put(`/update-profile/${userId}/`, monoId);
      return response;
    } catch (error) {
    }
  },


  resendPassword: async (emailId) => {
    try {
      const response = await fetchAuthWrapper.post("sendverificationlink/", {
        emailId: emailId,
      });
      return response;
    } catch (error) {
    }
  },

  resetPassword: async (request) => {
    try {
      const response = await fetchAuthWrapper.put("setnewpassword/", request);
      return response;
    } catch (error) {
    }
  },

  logout: async () => {
    try {
      cancelTokenSources.forEach((source) => source.cancel("Logout initiated"));
      cancelTokenSources.length = 0;
      localStorage.removeItem("isDefault");
      localStorage.removeItem("token");
      return true;
    } catch (error) {
      throw error;
    }
  },

  signup: async (payload) => {
    try {
      const response = await fetchAuthWrapper.post("/signup/", payload);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default authService;
