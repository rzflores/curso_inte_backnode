
import   express, { Request, Response }  from 'express'
import { Usuarios } from './entity/Usuarios'
import  { dbConect }  from './configDb/FileConfigDb'
import { AuthService } from './services/AuthService'


const app = express()

app.use( express.json() )



app.get('/',async (req :Request , res : Response) => {

    let result = await AuthService.login();
    const usersRepo = dbConect.getRepository(Usuarios);
    const usuarios = await  usersRepo.find()
    
    
    res.send( { usuarios} );   

})


export default app;