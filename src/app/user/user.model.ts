export class User {
  Id: number;
  FirstName: string;
  LastName: string;
  Address: string;
  Email: string;
  Phone: string;

  static fromApiResponse(apiUser: any): User {
    const user = new User();
    user.Id = apiUser.id;
    user.FirstName = apiUser.name.split(" ")[0];
    user.LastName = apiUser.name.split(" ")[1];
    user.Phone = this.generateValidPhoneNumber();
    user.Email = apiUser.email;
    user.Address = `${apiUser.address?.street}, ${apiUser.address?.suite}, ${apiUser.address?.city}, ${apiUser.address?.zipcode}`;
    return user;
  }

  private static generateValidPhoneNumber(): string {
    // Generate a random 10-digit number
    const min = 1000000000;
    const max = 9999999999;
    const randomDigits = Math.floor(Math.random() * (max - min + 1)) + min;
    return String(randomDigits);
  }
}
