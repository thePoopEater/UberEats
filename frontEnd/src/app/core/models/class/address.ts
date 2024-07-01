export class Address {
  addressId: number = 0;
  name: string = "";
  description: string = "";
  userId: number = 0;
}
export class CreateAddressDTO {
  name: string = "";
  description: string = "";
  userId: number = 0;

  constructor(name: string, description: string, userId: number) {
    this.name = name;
    this.description = description;
    this.userId = userId;
  }
}
