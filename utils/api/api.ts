import axios, { AxiosResponse } from "axios";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import Error from "next/error";
import { API_SERVER, API_SERVER_DEV, CLOUDINARY_URL } from "../../const";
import { CreateNotificationProps, LoginPayloadProps } from "../../interface";
import { socket } from "../socket";

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: API_SERVER,
  withCredentials: true,
});

// Next-auth login post method
export const login = async (
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

// Register post method
export const register = async (
  route: string,
  payload: any
): Promise<AxiosResponse> => {
  const res = await api.post(route, payload);

  return res;
};

export const getUser = async (token: string): Promise<AxiosResponse> => {
  if (token) {
    const res = await api.get("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
};

export const getUserStatus = async (token: string): Promise<string | null> => {
  if (token) {
    const res = await api.get("/api/user/status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
};

interface IStatus {
  status: string;
}

export const updateUserStatus = async (
  token: string,
  body: IStatus
): Promise<string | null> => {
  if (token) {
    const res = await api.put("/api/user/status", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
};

export const getPosts = async (
  token: string,
  limit?: number,
  skip?: number
): Promise<any> => {
  try {
    skip = skip ? skip : 0;
    limit = limit ? limit : 10;
    if (token) {
      const res = await api.get(`/api/post?limit=${limit}&skip=${skip}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getPostById = async (
  token: string,
  id: string
): Promise<AxiosResponse> => {
  try {
    if (token) {
      const res = await api.get(`/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getNotifications = async (
  token: string,
  limit?: number,
  skip?: number
): Promise<any> => {
  if (token) {
    skip = skip ? skip : 0;
    limit = limit ? limit : 10;
    const res = await api.get(`/api/notification?limit=${limit}&skip=${skip}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
};

export const searchQuery = async (
  token: string,
  limit?: number,
  skip?: number,
  search_key?: string
): Promise<any> => {
  skip = skip ? skip : 0;
  limit = limit ? limit : 10;
  search_key = search_key ? search_key : "";
  const res = await api.get(
    `/api/search?limit=${limit}&skip=${skip}&search_key=${search_key}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  socket.emit("client:refresh_data");
  return res.data;
};

export const updateNotification = async (
  token: string,
  id: string,
  status: string
): Promise<AxiosResponse> => {
  if (token) {
    const res = await api.put(
      `/api/notification/${id}/update`,
      {
        notification_status: status,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  }
};

export const deleteNotification = async (
  token: string,
  id: string
): Promise<AxiosResponse> => {
  if (token) {
    const res = await api.delete(`/api/notification/${id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    socket.emit("client:refresh_data");
    return res.data;
  }
};

export const getUsersRecommendation = async (
  token: string
): Promise<AxiosResponse> => {
  if (token) {
    const res = await api.get("/api/user/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
};

export const createNotification = async (
  token: string,
  body: CreateNotificationProps
): Promise<AxiosResponse> => {
  const res = await api.post("/api/notification", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const uploadCloudinary = async (attachments: File) => {
  const formData = new FormData();
  formData.append("file", attachments);
  formData.append("upload_preset", "creatve");

  const res = await fetch(CLOUDINARY_URL, {
    method: "post",
    body: formData,
  });
  const { url } = await res.json();
  return url;
};

export const createPosts = async (
  token: string,
  body: any
): Promise<AxiosResponse> => {
  const res = await api.post("/api/post/create", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  socket.emit("client:refresh_data");
  return res.data;
};

export const updatePost = async (
  token: string,
  body: any,
  id: string
): Promise<AxiosResponse> => {
  const res = await api.put(`/api/post/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  socket.emit("client:refresh_data");
  return res.data;
};

export const deleteReactNotifications = async (
  token: string,
  notify_by: string,
  post_id: string
): Promise<AxiosResponse> => {
  const res = await api.delete(
    `/api/notification/delete-react-notification/${notify_by}/${post_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const markNotificationRead = async (
  token: string,
  id: string
): Promise<AxiosResponse> => {
  const res = await api.put(
    `/api/notification/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  socket.emit("client:refresh_data");
  return res.data;
};

export const markAllNotificationsRead = async (
  token: string
): Promise<AxiosResponse> => {
  const res = await api.put(
    "/api/notification/update/mark-all-read",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  socket.emit("client:refresh_data");
  return res.data;
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

export const getComments = async (token: string, id: string): Promise<any> => {
  const res = await api.get(`/api/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
