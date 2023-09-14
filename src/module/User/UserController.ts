import { Request, Response } from 'express';
import UserService from './UserService';

class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const newUser = await UserService.createUser(data);
      return res.status(200).send(newUser);
    } catch (error) {
      console.error(error);
      return res.status(400).send('Falha ao cadastrar usuário.');
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const {email, password} = req.body;
      const userLogin = await UserService.userLogin(email, password);
      return res.status(200).send(userLogin);
    } catch (error) {
      console.error(error);
      return res.status(400).send('Usuario e/ou senha inválido.');
    }
  }
}

export default new UserController();
