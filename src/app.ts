
import   express  from 'express'
import cors from 'cors'

import authRoute from './routes/auth.routes'
import sucursalRoute from './routes/sucursal.routes'
import usuarioRoute from './routes/usuarios.routes'
import rolRoute from './routes/rol.routes'
import categoriaRoute from './routes/categoria.routes'
import unidadMedidasRoute from './routes/unidadMedidas.routes'
import cuponRoute from './routes/cupon.routes'
import menuRoute from './routes/menu.routes'
import productoRoute from './routes/producto.routes'
import envioRoute from './routes/envio.routes'
import ventaRoute from './routes/venta.routes'
import reporteRoute from './routes/reporte.routes'


const app = express()

app.use(cors({
    origin: '*'
}))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.use( express.json() )



app.use( authRoute )
app.use( sucursalRoute )
app.use( usuarioRoute )
app.use( rolRoute )
app.use( categoriaRoute )
app.use( unidadMedidasRoute )
app.use( cuponRoute )
app.use( menuRoute )
app.use( productoRoute )
app.use( envioRoute )
app.use( ventaRoute )
app.use( reporteRoute )






export default app;