import { compare, hash } from 'bcrypt';
import { IUser, Users } from './UserModel';
import jwt from 'jsonwebtoken';
import UserRepository from './UserRepository';
import Utils from '../UtilsService';

class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(data: IUser): Promise<IUser> {
    const { name, nick, password, email } = data;
    const secrectPassword = await hash(password, 8);
    let user: Users = await this.userRepository.getUserByEmail(email);

    const passwordValidation = new RegExp('^(?=(?:.*\d){3})(?=.*[!@#$%^&*])(?=.*[A-Z]).*$');
    const emailValidation = new RegExp(/^[\w\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,6}$/);

    if (!name || !Utils.validateBetween(name.length)) throw new Error('Nome invalido, informe um nome de 3 a 255 caracteres.');
    if (!nick || !Utils.validateBetween(nick.length)) throw new Error('Nick invalido, informe um nome de 3 a 255 caracteres.');
    if (!email || !emailValidation.test(email)) throw new Error('Email invalido.');
    if (user) throw new Error('Usuário já cadastrado.');
    user = user.dataValues;

    if (!password || passwordValidation.test(password)) throw new Error('Senha inválida, necessário 3 números, 1 letra maiúscula, e 1 simbolo.');

    const newUser = await this.userRepository.createUser({ name, nick, password: secrectPassword, email });
    return newUser;
  }

  async userLogin(email: string, password: string) {
    let user: Users = await this.userRepository.getUserByEmail(email);

    if (!user) throw new Error('Usuário não encontrado');

    user = user.dataValues;
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) throw new Error('Senha inválida');

    Reflect.deleteProperty(user, 'password');
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
    return { user, token };
  }
}

export default new UserService();
