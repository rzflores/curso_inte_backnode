
import   express  from 'express'

import authRoute from './routes/auth.routes'
import sucursalRoute from './routes/sucursal.routes'
import usuarioRoute from './routes/usuarios.routes'
import rolRoute from './routes/rol.routes'
import categoriaRoute from './routes/categoria.routes'
import unidadMedidasRoute from './routes/unidadMedidas.routes'

const app = express()

app.use( express.json() )



app.use( authRoute )
app.use( sucursalRoute )
app.use( usuarioRoute )
app.use( rolRoute )
app.use( categoriaRoute )
app.use( unidadMedidasRoute )




export default app;