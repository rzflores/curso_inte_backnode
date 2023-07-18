import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { CabeceraEnvios } from "../entity/CabeceraEnvios";
import { DetalleEnvios } from "../entity/DetalleEnvios";
import { GuiasRemision } from "../entity/GuiasRemision";
import { RegistrarEnvioDTO } from "../DTO/RegistrarEnvioDTO";
import UsuarioService from "./usuario.services";
import SucursalService from "./surcursal.services";
import ProductoService from "./producto.services";
import { Productos } from "../entity/Productos";
import { GuiasRemisionInterface } from "../types/guiaRemision.type";

export default class EnvioService  {

    private readonly cabeceraEnviosService: Repository<CabeceraEnvios> = dbConect.getRepository(CabeceraEnvios); 
    private readonly detalleEnviosService: Repository<DetalleEnvios> = dbConect.getRepository(DetalleEnvios); 
    private readonly guiaRemisionService: Repository<GuiasRemision> = dbConect.getRepository(GuiasRemision); 
    private readonly productoServiceRepo: Repository<Productos> = dbConect.getRepository(Productos);

    constructor(){

    }
    async registrarEnvio(envio : RegistrarEnvioDTO): Promise<GuiasRemisionInterface> {
        try {
            let productoService = new ProductoService();
           
            // registrar cabecera de envio    
            let cabeceraEnvio = new  CabeceraEnvios();
            cabeceraEnvio.FechaSalida = envio.FechaSalida;
            cabeceraEnvio.FechaLlegada = envio.FechaLlegada;
            cabeceraEnvio.NombreConductor = envio.NombreConductor;
            cabeceraEnvio.CelularConductor = envio.CelularConductor;
            cabeceraEnvio.PlacaVehiculo = envio.PlacaVehiculo;
            let usuarioService = new UsuarioService();
            let usuario = await usuarioService.obtenerUsuarioModel(envio.IdUsuario);
            cabeceraEnvio.IdUsuario = usuario;    
            let sucursalService = new SucursalService();
            let sucursalOrigen = await sucursalService.obtenerSucursalModel(envio.IdSucursalOrigen);
            let sucursalDestino = await sucursalService.obtenerSucursalModel(envio.IdSucursalDestino);
            cabeceraEnvio.IdSucursalOrigen = sucursalOrigen;
            cabeceraEnvio.IdSucursalDestino = sucursalDestino;
            let cabeceraEnvioGuardada = await this.cabeceraEnviosService.save(cabeceraEnvio);

            let IdCabeceraEnvio = cabeceraEnvioGuardada.IdCabeceraEnvio;

            // registrar guia Remision
            let guiaRemision = new GuiasRemision();
            let cabeceraEnvioRegistrada = await this.cabeceraEnviosService
            .findOne( { where : { IdCabeceraEnvio }} )
            let resultUltimaGuia : GuiasRemision[] = await this.guiaRemisionService.find({
                order: {
                    IdGuiaRemision: 'DESC' 
                },
                take: 1 
              });

            let guiaRemisionGuardada = null;
            //primera vez que se registra una guia  
            if(resultUltimaGuia == null){
                guiaRemision.CabeceraEnviosIdCabeceraEnvio = cabeceraEnvioRegistrada;
                guiaRemision.Codigo = "G"
                guiaRemision.FechaGuia = new Date().toISOString().split('T')[0];
                guiaRemision.Numero = 1
                guiaRemisionGuardada = await this.guiaRemisionService.save(guiaRemision);
            }else{
                guiaRemision.CabeceraEnviosIdCabeceraEnvio = cabeceraEnvioRegistrada;
                guiaRemision.Codigo = "G"
                resultUltimaGuia[0].Numero++;
                guiaRemision.Numero = resultUltimaGuia[0].Numero;
                guiaRemision.FechaGuia = new Date().toISOString().split('T')[0];
                guiaRemisionGuardada = await this.guiaRemisionService.save(guiaRemision);
            }  

            //registrar detalle envio
            envio.ListaDetalleEnvio.forEach(async e =>  {
                 let detalleEnvio = new DetalleEnvios();
                 detalleEnvio.Cantidad = e.Cantidad;
                 detalleEnvio.SubTotal = e.SubTotal;
                 detalleEnvio.ProductosIdProducto = await productoService.obtenerProductoModel(e.IdProducto);
                 detalleEnvio.CabeceraVentasIdCabeceraVentas = cabeceraEnvioRegistrada
                 await this.detalleEnviosService.save(detalleEnvio)
            })

            // realizar el cambio de sucursal en la tabla productos
            envio.ListaDetalleEnvio.forEach(async e =>  {
                //reducir stock
                let producto = await productoService.obtenerProductoModel(e.IdProducto);
                producto.StockActual = producto.StockActual - e.Cantidad
                await this.productoServiceRepo.save(producto);
                //validar si el producto existe en otra sucursal
                let resultExiste = await productoService.obtenerProductoPorNombre(producto.NombreProducto, sucursalDestino.IdSucursal)
                if(resultExiste != null){
                //flujo si existe -> se aumenta el stock sucursal destino
                      resultExiste.StockActual = resultExiste.StockActual + e.Cantidad
                      await this.productoServiceRepo.save(resultExiste);
                }else
                {
                //flujo no existe -> crear el producto pero con otra sucursal
                    let productoEnviado = new Productos();
                    productoEnviado = producto;
                    productoEnviado.IdProducto = null ;
                    productoEnviado.StockActual = e.Cantidad;
                    productoEnviado.SurcursalIdSucursal = sucursalDestino;
                    await this.productoServiceRepo.save(productoEnviado)
                }
            })
            return  new Promise<GuiasRemisionInterface>((resolve ,reject ) => {
                  resolve(guiaRemisionGuardada)
             })               
        } catch (error) {
             console.log(error)   
             return Promise.reject(new Error("Error | EnvioService"));
        }
    }
      
}