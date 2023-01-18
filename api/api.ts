import axios, { Axios, AxiosResponse } from "axios";
import { signIn, SignInResponse } from "next-auth/react";
import { LoginPayloadProps } from "../interface";
axios.defaults.withCredentials = true;

const apiServer = "http://localhost:3001";

export const api = axios.create({
  baseURL: apiServer,
  withCredentials: true,
});

// API calls
// @Post
export const postLogin = async (
  credentials: string,
  payload: LoginPayloadProps
): Promise<SignInResponse> => {
  const res = await signIn(credentials, {
    redirect: false,
    username: payload.username,
    password: payload.password,
    callbackUrl: "/",
  });

  return res;
};

export const postReaction = async (
  route: string,
  token: string,
  payload: { reactor: string; reaction: number }
): Promise<AxiosResponse> => {
  const res = await api.post(route, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

// @Get
export const getLoginUser = async (
  route: string,
  token: string
): Promise<AxiosResponse> => {
  const res = await api.get(route, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};

export const getPosts = async (
  route: string,
  token: string
): Promise<AxiosResponse> => {
  const res = await api.get(route, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res;
};
