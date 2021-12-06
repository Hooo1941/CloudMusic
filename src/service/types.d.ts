declare namespace API {
  type Login = {
    phone: number;
    password: string;
    md5password?: string;
  };
}
