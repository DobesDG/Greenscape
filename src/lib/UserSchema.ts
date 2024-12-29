interface UserData {
  userName: string;
  email: string;
  password: string;
  repassword: string;
}

interface PersonalData {
  fullName: string;
  cpf: string;
  gender: string;
}

interface Address {
  cep: string;
  street: string;
  number: number;
  state: string;
  city: string;
}

export interface UserSchema {
  userData: UserData;
  personalData: PersonalData;
  address: Address;
}
