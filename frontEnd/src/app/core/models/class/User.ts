export class User {
  username: string = "";
  password: string = "";
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
export class UserCreateDTO {
  username: string = "";
  password: string = "";
  role: string = "";
  constructor(username: string, password: string, role: string) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}

export class UserResponse {
  accessToken: string = "";
  userId: number = 0;
  role: string = "";
}
