
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


const app = express()
app.use(cors())
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




export default app;