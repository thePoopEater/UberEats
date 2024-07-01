export class User {
  userId: number = 0;
  name: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  role: string = "";
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class UserCreateDTO {
  name: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  role: string = "";
  constructor(
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
  ) {
    this.name = name;
    this.lastName = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class UserResponse {
  accessToken: string = "";
}
