
// export interface ApiResponseUserI {
//     status:string;
//     message:string;
//     data:UserI;
// }

export interface UserI {
    ruc: string;
    cliente: string;
    mail: string;
    direccion: string;
    telefono: string;

    isExist?: boolean;
}


export interface LoginResponseApiI{

    st:string;
    rolus:string;
    nombre:string;
    status?:string;

}

export interface RegisterResponseApiI{

    st:string;
    idp:string;
    ident:string;

}