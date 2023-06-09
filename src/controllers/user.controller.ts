import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/user/createUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";
import { listUserService } from "../services/user/listUser.service";
import { IUserLogin } from "../interfaces/users";
import { loginService } from "../services/user/login.service";
import { IUserUpdate } from "../interfaces/users";
import { updateUserService } from "../services/user/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.status(200).json(users);
};

export const loginController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const token = await loginService(sessionData);
  return res.status(200).json({ token });
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const data = await updateUserService(userData, req.params.product_id);
  return res.status(200).send(data);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const softDeleteUser = await deleteUserService(req.params.user_id);
  return res.status(204).json(softDeleteUser);
};
