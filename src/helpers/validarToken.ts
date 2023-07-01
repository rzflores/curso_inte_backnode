import jwt  from 'jsonwebtoken';
import { TokenErrorName , EnumTokenTypeError } from '../types/auth.type';

const validarToken = (token: string): Promise<TokenErrorName> => {
    return new Promise<TokenErrorName>((resolve, reject) => {
      let TokenErrorName : TokenErrorName;
      const secretKey = 'Abc123$';
      jwt.verify(token, secretKey, (err) => {
        if (err) {
            console.log(err.message)
            if(err.message.match(EnumTokenTypeError.Invalido) || err.message.match(EnumTokenTypeError.OtrosError))
            {
              TokenErrorName = {
                TokenTypeError : EnumTokenTypeError.Invalido
              }
            }
            else{
              TokenErrorName = {
                TokenTypeError : EnumTokenTypeError.Expirado
              }
            }
          resolve(TokenErrorName);
        } else { 
          TokenErrorName = {
            TokenTypeError : EnumTokenTypeError.Correcto
          }         
          resolve(TokenErrorName);
        }
      });
    });
  };

export { validarToken } 


