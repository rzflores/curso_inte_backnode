import { Request, Response, NextFunction } from 'express';
import { validarToken } from '../helpers/validarToken';
import { EnumTokenTypeError } from '../types/auth.type';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token : string = req.headers['token'] as string
    if(!token){ return res.status(401).json({ 
                                            ok : false,
                                            mensaje: 'No se proporcionó un token.' 
                                        }); }


    let resultValidarToken =  await validarToken(token) 
    
    if(resultValidarToken.TokenTypeError === EnumTokenTypeError.Invalido){
        return res.status(401).json({ 
                                   ok : false,
                                   mensaje: 'Token invalido.' 
        })
    }else if(resultValidarToken.TokenTypeError === EnumTokenTypeError.Expirado)
    {
        return res.status(401).json({ 
            ok : false,
            mensaje: 'Token Expirado.' 
        })
    }else{
        next()
    }                                     
}
    


export { checkToken };

