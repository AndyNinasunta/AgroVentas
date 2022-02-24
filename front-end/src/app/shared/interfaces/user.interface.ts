
export interface ApiResponseUserI {
    status:string;
    message:string;
    data:UserI;
}

export interface UserI {
    idUser?:number;
    identificationNumber:string;
    fullName:string;
    email:string;
    direction:string;
    phoneNumber:string;
}