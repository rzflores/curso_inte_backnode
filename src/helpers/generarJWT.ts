import jwt from 'jsonwebtoken';

 const generarJWT = (IdUsuario : number , UsuarioNombre : string) => 
 {

    const secretKey = 'Abc123$';
    const expiresIn = '1h';
    
    const token = jwt.sign({ IdUsuario, UsuarioNombre }, secretKey, { expiresIn });
    
    console.log(token);
   return token;
}


export {generarJWT}