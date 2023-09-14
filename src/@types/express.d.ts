declare namespace Express {
  export interface Request {
    user: import('../module/User/UserModel').User;
  }
}
