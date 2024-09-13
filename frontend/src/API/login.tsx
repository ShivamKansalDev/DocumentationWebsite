import axios, { AxiosHeaders } from "axios";
// import { UserDetails } from "../types/components";

export const apiCall = axios.create({
  baseURL: "http://127.0.0.1:3001/api/",
  // baseURL: "https://documentation-website-six.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiCall.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("token");
    const userDetails: string | null = localStorage.getItem("userDetails");
    let parsedData;
    if (userDetails) {
      parsedData = JSON.parse(userDetails);
    }
    const refreshToken = parsedData?.refreshtoken;
    // console.log("Access token: ", accessToken, "\n\n");
    if (
      !config.url?.includes("users/login") &&
      !!accessToken &&
      !!refreshToken
    ) {
      (config.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${accessToken}`
      );
      if (config.url === "users/refresh-access-token") {
        (config.headers as AxiosHeaders).set(
          "Refresh",
          `Refresh ${refreshToken}`
        );
      }
    }
    // console.log("Config headers: ", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiCall.interceptors.response.use(
  (response) => {
    if (response.config.url === "users/refresh-access-token") {
      // save updated accessToken in local/secure storage
      const userDetails: string | null = localStorage.getItem("userDetails");
      let parsedDetails;
      if (userDetails) {
        parsedDetails = JSON.parse(userDetails);
      }
      const accessToken = response.data?.token;
      const updatedToken = Object.assign({}, parsedDetails, {
        accesstoken: accessToken,
      });
      localStorage.setItem("userDetails", JSON.stringify(updatedToken));
      localStorage.setItem("token", accessToken);
    }
    return response;
  },
  async (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      /// Hit API with refresh and access token
      const userDetails = localStorage.getItem("userDetails");
      if (userDetails) {
        const parsedDetails = JSON.parse(userDetails);
        await apiCall.post("users/refresh-access-token", {
          email: parsedDetails?.email,
        });
        window.location.reload();
      }
    } else if (status === 403) {
      // clear local/secure storage
      /// refresh token has expired ---->>>> Log out user and redirect to home page
      localStorage.clear();
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
