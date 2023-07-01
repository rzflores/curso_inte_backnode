export interface RenovarTokenInterface{
    ok : boolean,
    newToken : string
}

export enum EnumTokenTypeError { Invalido =  "invalid token"   ,  Expirado= "jwt expired" , Correcto = "token valido" , OtrosError = "jwt malformed" }  

export interface TokenErrorName{    
    TokenTypeError : EnumTokenTypeError     
}