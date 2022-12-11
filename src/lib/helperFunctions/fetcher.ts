/* eslint-disable no-restricted-globals */
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { UserPayload } from "../../models/listers";
import { getUserToken, removeUserToken, setUserToken } from "./tokenValidation";

interface ResApi {
  code: number;
  data: any;
  errors: string[];
  message: string;
  successful: boolean;
}

const customAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function postApi(
  url: string,
  body: any = null,
  headers: any = {}
): Promise<ResApi> {
  try {
    const res = await customAxios.post(url, body, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}
export async function putApi(
  url: string,
  body: any = null,
  headers: any = {}
): Promise<ResApi> {
  try {
    const res = await customAxios.put(url, body, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}
export async function deleteApi(
  url: string,
  headers: any = {}
): Promise<ResApi> {
  try {
    const res = await customAxios.delete(url, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}

export async function fetcher(url: string, headers: any = {}): Promise<ResApi> {
  try {
    const res = await customAxios.get(url, { headers });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err.code;
  }
}

const requestHandler = (request: AxiosRequestConfig<any>) => {
  const token = `Bearer ${getUserToken()?.jwToken}`;
  request.headers = {
    ...request.headers,
    Authorization: token,
  };
  return request;
};

const responseHandler = (response: AxiosResponse<any, any>) => {
  console.log(response);

  if (response.config.method === "get") {
    console.log("It was a get");
  }

  if (response.config.method === "post") {
    console.log("It was a get");
  }
  return response;
};

export const updateToken = async () => {
  const res = await postApi("Account/refresh-token", {
    refreshToken: getUserToken()?.refreshToken,
  });
  return res.data;
};

const errorHandler = (error: any) => {
  if (error.config && error.response && error.response.status === 401) {
    return updateToken()
      .then((res: UserPayload) => {
        error.config.headers.token = res.jwToken;
        console.warn(res);
        console.warn(res);
        console.warn(res);
        console.warn(res);
        setUserToken(res);
        return customAxios.request(error.config);
      })
      .catch(() => {
        console.warn("failed to get token");
        console.warn("failed to get token");
        console.warn("failed to get token");
        removeUserToken();
        location.reload();
        // go to login page
      });
  }
  console.log(error.config);
  toast.error(
    "An error occured, Kindly check your internet connection and try again, if it persists kindly reach out to the support team"
  );
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
