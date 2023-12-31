import 'reflect-metadata';
import  { dbConect }  from './configDb/FileConfigDb';
import app from './app'
import { config } from 'dotenv';

const init = async () =>{
    try {
        config()
        await dbConect.initialize()
        .then(() => { console.log("Conectado con exito!")})
        .catch((e) => { console.log("Error al conectar la base de datos" + e) })
        app.listen( process.env.PORT || 4040 , () => {
            console.log('listen port 4040')
        })
    } catch (error) {
        console.log('Error inicial |' + error)        
    }
}

init();
