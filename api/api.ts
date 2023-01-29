import axios, { Axios, AxiosResponse } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { API_SERVER, API_SERVER_DEV } from "../const";
import { LoginPayloadProps } from "../interface";
axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

// API calls
// @Post
export const postLogin = async (
  credentials: string,
  payload: LoginPayloadProps
): Promise<SignInResponse | null> => {
  const res = await signIn(credentials, {
    redirect: false,
    username: payload.username,
    password: payload.password,
    callbackUrl: "/",
  });

  return res;
};

export const postRegister = async (
  route: string,
  payload: any
): Promise<AxiosResponse> => {
  const res = await api.post(route, payload);

  return res;
};

export const POST = async (
  route: string,
  token: string,
  payload?: any
): Promise<AxiosResponse | null> => {
  const res = await api.post(route, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// @Delete
export const DELETE = async (
  route: string,
  token: string
): Promise<AxiosResponse | null> => {
  const res = await api.delete(route, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// @Get
export const GET = async (
  route: string,
  token: string
): Promise<AxiosResponse> => {
  const res = await api.get(route, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// @Put
export const PUT = async (
  route: string,
  token: string
): Promise<AxiosResponse> => {
  const res = await api.put(
    route,
    { is_new_user: false },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res;
};
