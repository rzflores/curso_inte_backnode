import jwt, { JwtPayload } from 'jsonwebtoken';

const verificarExpiracionJWT =  (token : string) : boolean  => {

  try {

    const secretKey = 'Abc123$';
    const decodedToken : any = jwt.verify(token, secretKey ) ;
    const expirationDate = new Date(decodedToken.exp * 1000);
    const isExpired =new Date().getTime() <= expirationDate.getTime();
    if (isExpired) {
        return false;
      } else {
        return true;
    }
  } catch (error) {
      return true;
  }
}

export { verificarExpiracionJWT } 


