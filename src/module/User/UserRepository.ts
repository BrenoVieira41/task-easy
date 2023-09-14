import { IUser, Users } from './UserModel';

class UserRepository {
  public async createUser(data: IUser): Promise<Users> {
    return Users.create({ email: data.email, name: data.name, nick: data.nick, password: data.password });
  }

  public async getUserByEmail(email: string): Promise<Users> {
    const validateUser = await Users.findOne({ where: { email } });
    return validateUser;
  }
}

export default UserRepository;
