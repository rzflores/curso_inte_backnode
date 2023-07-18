import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { DetalleEnvios } from "../entity/DetalleEnvios";
import { GuiasRemision } from "../entity/GuiasRemision";
import ProductoService from "./producto.services";
import { Productos } from "../entity/Productos";
import { RegistrarVentaDTO } from "../DTO/RegistrarVentaDTO";
import { CabeceraVentas } from "../entity/CabeceraVentas";
import CuponService from "./cupon.services";
import { DetalleVentas } from "../entity/DetalleVentas";
import { Boletas } from "../entity/Boletas";
import { BoletaInterface } from "../types/Boleta.type";

export default class VentaService  {

    private readonly cabeceraVentasService: Repository<CabeceraVentas> = dbConect.getRepository(CabeceraVentas); 
    private readonly detalleVentasService: Repository<DetalleVentas> = dbConect.getRepository(DetalleVentas); 
    private readonly boletaService: Repository<Boletas> = dbConect.getRepository(Boletas); 
    private readonly productoServiceRepo: Repository<Productos> = dbConect.getRepository(Productos);

    constructor(){

    }
    async registrarVenta(venta : RegistrarVentaDTO): Promise<BoletaInterface> {
        try {
            let productoService = new ProductoService();
           
            // registrar cabecera de envio    
            let cabeceraVentas = new  CabeceraVentas();
            cabeceraVentas.TotalVenta = venta.TotalVenta;
            cabeceraVentas.FechaVenta = venta.FechaVenta;
           
            if(venta.IdCupon != null)
            {
                let cuponService = new CuponService();
                let cupon = await cuponService.obtenerCuponModel(venta.IdCupon);
                cabeceraVentas.IdCupon = cupon;
                let descuento = (cabeceraVentas.TotalVenta * cupon.PorcentajeDescuento)/100
                cabeceraVentas.TotalVenta = cabeceraVentas.TotalVenta - descuento;
            }

            let cabeceraVentaGuardada = await this.cabeceraVentasService.save(cabeceraVentas);

            let IdCabeceraVenta = cabeceraVentaGuardada.IdCabeceraVenta;
            // registrar boleta
            let boleta = new Boletas();
            let cabeceraVentaRegistrada = await this.cabeceraVentasService
            .findOne( { where : { IdCabeceraVenta }} )
            let resultUltimaBoleta : Boletas[] = await this.boletaService.find({
                order: {
                    IdBoleta: 'DESC' 
                },
                take: 1 
              });

            let boletaGuardada = null  

               //primera vez que se registra una boleta  
            if(resultUltimaBoleta == null){
                boleta.CabeceraVentasIdCabeceraVentas = cabeceraVentaRegistrada;
                boleta.Codigo = "B"
                boleta.FechaBoleta = new Date().toISOString().split('T')[0];
                boleta.Numero = 1
                boletaGuardada = await this.boletaService.save(boleta);
            }else{
                boleta.CabeceraVentasIdCabeceraVentas = cabeceraVentaRegistrada;
                boleta.Codigo = "B"
                resultUltimaBoleta[0].Numero++;
                boleta.Numero = resultUltimaBoleta[0].Numero;
                boleta.FechaBoleta = new Date().toISOString().split('T')[0];
                boletaGuardada = await this.boletaService.save(boleta);
            }  

            //registrar detalle envio
            venta.ListaDetalleVenta.forEach(async e =>  {
                 let detalleVenta = new DetalleVentas();
                 detalleVenta.Cantidad = e.Cantidad;
                 detalleVenta.SubTotal = e.SubTotal;
                 detalleVenta.ProductosIdProducto = await productoService.obtenerProductoModel(e.IdProducto);
                 detalleVenta.CabeceraVentasIdCabeceraVentas = cabeceraVentaRegistrada
                 await this.detalleVentasService.save(detalleVenta)
            })

            // reducir stock de cada producto
            venta.ListaDetalleVenta.forEach(async e =>  {
                //reducir stock
                let producto = await productoService.obtenerProductoModel(e.IdProducto);
                producto.StockActual = producto.StockActual - e.Cantidad
                await this.productoServiceRepo.save(producto)
            })

            return  new Promise<BoletaInterface>((resolve ,reject ) => {
                  resolve(boletaGuardada)
             })               
        } catch (error) {
             console.log(error)   
             return Promise.reject(new Error("Error | EnvioService"));
        }
    }
      
}