import { Repository } from "typeorm";
import { dbConect } from "../configDb/FileConfigDb";
import { SucursalUsuarioInterface } from "../types/surcursal.type";
import { ProductoRepository } from "../repo/producto.repository";
import { AgregarProductoDTO } from "../DTO/AgregarProductoDTO";
import { FiltrosStockDTO } from "../DTO/FiltrosStockDTO";
import { FiltrosVencimientoDTO } from "../DTO/FiltrosVencimientoDTO";
import { ProductoDTO } from "../DTO/ProductoDTO";
import { ProductoInterface } from "../types/producto.type";
import { ReporteStock, ReporteVencimiento } from "../types/reporte.type";
import { Productos } from "../entity/Productos";
import { CategoriaInterface } from "../types/categoria.type";
import { UnidadMedidasInterface } from "../types/unidadMedidas.type";
import CategoriaService from "./categorias.services";
import SucursalService from "./surcursal.services";
import UnidadMedidasService from "./unidadMedidas.services";

export default class ProductoService implements ProductoRepository{

    private readonly productoService: Repository<Productos> = dbConect.getRepository(Productos); 

    constructor(){

    }
    async obtenerProducto(IdProducto: number): Promise<ProductoInterface> {
        try {
            const result = await this.productoService
            .createQueryBuilder('productos')
            .leftJoinAndSelect('productos.CategoriaIdCategoria', 'categorias')
            .leftJoinAndSelect('productos.UnidadMedidasIdUnidadMedidas', 'unidad_medidas')
            .leftJoinAndSelect('productos.SurcursalIdSucursal', 'sucursales')
            .where('productos.IdProducto = :IdProducto', { IdProducto: IdProducto })
            .getOne();

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            let itemCategoria : CategoriaInterface = {
                IdCategoria : result.CategoriaIdCategoria.IdCategoria,
                Nombre : result.CategoriaIdCategoria.Nombre
            }
            let itemUnidadMedida : UnidadMedidasInterface = {
                IdUnidadMedida : result.UnidadMedidasIdUnidadMedidas.IdUnidadMedida,
                Numero : result.UnidadMedidasIdUnidadMedidas.Numero,
                NombreGramajeCorto : result.UnidadMedidasIdUnidadMedidas.NombreGramajeCorto,
                NombreGramajeLargo :  result.UnidadMedidasIdUnidadMedidas.NombreGramajeLargo
            }

            let itemUsuarioSurcursal : SucursalUsuarioInterface = {
                IdSucursal : result.SurcursalIdSucursal.IdSucursal,
                Nombre : result.SurcursalIdSucursal.Nombre
            }
            
            let itemProducto : ProductoInterface = {
                IdProducto : result.IdProducto,
                NombreProducto : result.NombreProducto,
                DescripcionCorta : result.DescripcionCorta,
                DescripcionLarga : result.DescripcionLarga,
                PrecioUnitario : result.PrecioUnitario,
                StockActual : result.StockActual ,
                UrlImagen : result.UrlImagen,
                FechaVencimiento : result.FechaVencimiento ,
                Categoria : itemCategoria,
                UnidadMedida : itemUnidadMedida,
                Sucursal : itemUsuarioSurcursal
                
            }                                 
            return  new Promise<ProductoInterface>((resolve ,reject ) => {
                resolve(itemProducto)
        })               
        } catch (error) {     
            console.log(error)       
            return Promise.reject(new Error("Error | ProductoService | obtenerProducto"));
        }
    }
    async obtenerProductoModel(IdProducto: number): Promise<Productos> {
        try {
            const result = await this.productoService
            .createQueryBuilder('productos')
            .leftJoinAndSelect('productos.CategoriaIdCategoria', 'categorias')
            .leftJoinAndSelect('productos.UnidadMedidasIdUnidadMedidas', 'unidad_medidas')
            .leftJoinAndSelect('productos.SurcursalIdSucursal', 'sucursales')
            .where('productos.IdProducto = :IdProducto', { IdProducto: IdProducto })
            .getOne();

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            
            return  new Promise<Productos>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {     
            console.log(error)       
            return Promise.reject(new Error("Error | ProductoService | obtenerProducto"));
        }
    }
    async obtenerProductoPorNombre(Nombre: string , IdSucursal : number): Promise<Productos | null> {
        try {
            console.log(Nombre,IdSucursal)
            const result = await this.productoService
            .createQueryBuilder('productos')
            .leftJoinAndSelect('productos.CategoriaIdCategoria', 'categorias')
            .leftJoinAndSelect('productos.UnidadMedidasIdUnidadMedidas', 'unidad_medidas')
            .leftJoinAndSelect('productos.SurcursalIdSucursal', 'sucursales')
            .where('productos.NombreProducto = :NombreProducto', { NombreProducto:  Nombre })
            .andWhere('productos.SurcursalIdSucursal = :IdSucursal', { IdSucursal })
            .getOne();

            if(result == null) { return Promise.reject(null); }
            console.log(result)
            
            return  new Promise<Productos>((resolve ,reject ) => {
                resolve(result)
        })               
        } catch (error) {     
            console.log(error)       
            return Promise.reject(new Error("Error | ProductoService | obtenerProducto"));
        }
    }
    async obtenerProductos(IdSucursal : number): Promise<ProductoInterface[]> {
           try {
            let result = await  this.productoService .createQueryBuilder('productos')
            .leftJoinAndSelect('productos.CategoriaIdCategoria', 'categorias')
            .leftJoinAndSelect('productos.UnidadMedidasIdUnidadMedidas', 'unidad_medidas')
            .leftJoinAndSelect('productos.SurcursalIdSucursal', 'sucursales')
            .where('productos.SurcursalIdSucursal = :IdSucursal', { IdSucursal: IdSucursal })
            .getMany()

            if(result == null) { return Promise.reject(new Error("No se encontraron resultados")); }

            let lstProductos : ProductoInterface[] = [];
            result.forEach((e) => {
                let itemCategoria : CategoriaInterface = {
                    IdCategoria : e.CategoriaIdCategoria.IdCategoria,
                    Nombre : e.CategoriaIdCategoria.Nombre
                }
                let itemUnidadMedida : UnidadMedidasInterface = {
                    IdUnidadMedida : e.UnidadMedidasIdUnidadMedidas.IdUnidadMedida,
                    Numero : e.UnidadMedidasIdUnidadMedidas.Numero,
                    NombreGramajeCorto : e.UnidadMedidasIdUnidadMedidas.NombreGramajeCorto,
                    NombreGramajeLargo :  e.UnidadMedidasIdUnidadMedidas.NombreGramajeLargo
                }
                let itemUsuarioSurcursal : SucursalUsuarioInterface = {
                    IdSucursal : e.SurcursalIdSucursal.IdSucursal,
                    Nombre : e.SurcursalIdSucursal.Nombre
                }
                
                let itemProducto : ProductoInterface = {
                    IdProducto : e.IdProducto,
                    NombreProducto : e.NombreProducto,
                    DescripcionCorta : e.DescripcionCorta,
                    DescripcionLarga : e.DescripcionLarga,
                    PrecioUnitario : e.PrecioUnitario,
                    StockActual : e.StockActual ,
                    UrlImagen : e.UrlImagen,
                    FechaVencimiento : e.FechaVencimiento ,
                    Categoria : itemCategoria,
                    UnidadMedida : itemUnidadMedida,
                    Sucursal : itemUsuarioSurcursal
                    
                }     
                lstProductos.push(itemProducto)
            })
           

            return  new Promise<ProductoInterface[]>((resolve ,reject ) => {
                   resolve(lstProductos)
             })               
        } catch (error) {
            console.log(error.message)
             return Promise.reject(new Error("Error | UsuarioService | obtenerUsuarios"));
        }
    }
    async registrarProducto(agregarProductoDTO: AgregarProductoDTO): Promise<Boolean> {
             try {
            let newProducto = new Productos();
            newProducto.NombreProducto = agregarProductoDTO.NombreProducto;
            newProducto.DescripcionCorta = agregarProductoDTO.DescripcionCorta;
            newProducto.DescripcionLarga = agregarProductoDTO.DescripcionLarga;
            newProducto.PrecioUnitario = agregarProductoDTO.PrecioUnitario;
            newProducto.StockActual = agregarProductoDTO.StockActual;
            newProducto.UrlImagen = agregarProductoDTO.UrlImagen;
            newProducto.FechaVencimiento = agregarProductoDTO.FechaVencimiento;

            let categoriaService = new CategoriaService();
            let resultCategoria  = await categoriaService.obtenerCategoria(agregarProductoDTO.IdCategoria) 
            newProducto.CategoriaIdCategoria = resultCategoria

            let sucursalService = new SucursalService();
            let resultSucursal  = await sucursalService.obtenerSucursalModel(agregarProductoDTO.IdSucursal) 
            newProducto.SurcursalIdSucursal = resultSucursal
            

            let unidadMedidaService = new UnidadMedidasService();
            let resultUnidadMedida  = await unidadMedidaService.obtenerUnidadMedida(agregarProductoDTO.IdUnidadMedida) 
            newProducto.UnidadMedidasIdUnidadMedidas = resultUnidadMedida

            let result = await this.productoService.save(newProducto)
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | registrarUsuario"));
        }
    }
    async editarProducto(productoDTO: ProductoDTO): Promise<Boolean> {
            try {

            
            const editProducto = await this.productoService
                        .createQueryBuilder('productos')
                        .leftJoinAndSelect('productos.CategoriaIdCategoria', 'categorias')
                        .leftJoinAndSelect('productos.UnidadMedidasIdUnidadMedidas', 'unidad_medidas')
                        .leftJoinAndSelect('productos.SurcursalIdSucursal', 'sucursales')
                        .where('productos.IdProducto = :IdProducto', { IdProducto: productoDTO.IdProducto })
                        .getOne();
    

            if(editProducto == null) { return Promise.reject(new Error("Usuario no existe")); }  
            
            editProducto.NombreProducto = productoDTO.NombreProducto;
            editProducto.DescripcionCorta = productoDTO.DescripcionCorta;
            editProducto.DescripcionLarga = productoDTO.DescripcionLarga;
            editProducto.PrecioUnitario = productoDTO.PrecioUnitario;
            editProducto.StockActual = productoDTO.StockActual;
            editProducto.UrlImagen = productoDTO.UrlImagen;
            editProducto.FechaVencimiento = productoDTO.FechaVencimiento;

            if(productoDTO.IdCategoria != 0){
                let categoriaService = new CategoriaService();
                let resultCategoria  = await categoriaService.obtenerCategoria(productoDTO.IdCategoria) 
                editProducto.CategoriaIdCategoria = resultCategoria
                }
            if(productoDTO.IdSucursal != 0){
                let sucursalService = new SucursalService();
                let resultSucursal  = await sucursalService.obtenerSucursalModel(productoDTO.IdSucursal) 
                editProducto.SurcursalIdSucursal = resultSucursal
                }
            if(productoDTO.IdUnidadMedida != 0){
                let unidadMedidaService = new UnidadMedidasService();
                let resultUnidadMedida  = await unidadMedidaService.obtenerUnidadMedida(productoDTO.IdUnidadMedida) 
                editProducto.UnidadMedidasIdUnidadMedidas = resultUnidadMedida
                }

            let result = await this.productoService.save(editProducto);
            if(result == null) { return false }
            return true;
        } catch (error) {
            return Promise.reject(new Error("Error | SucursalService | editarUsuario"));
        }
    }
    async obtenerReporteStock(filtroStock: FiltrosStockDTO): Promise<ReporteStock[]> {
        throw new Error("Method not implemented.");
    }
    async obtenerReporteVencimiento(filtroVencimiento: FiltrosVencimientoDTO): Promise<ReporteVencimiento[]> {
        throw new Error("Method not implemented.");
    }
  
  
    
    
    // async editarUsuario(usuarioDTO: UsuarioDTO): Promise<boolean> {
    //     try {

            
    //         const editUsuario = await this.usuarioService
    //                                 .createQueryBuilder('usuarios')
    //                                 .leftJoinAndSelect('usuarios.RolesIdRoles', 'roles')
    //                                 .where('usuarios.IdUsuario = :IdUsuario', { IdUsuario: usuarioDTO.IdUsuario })
    //                                 .getOne();                        


    //         if(editUsuario == null) { return Promise.reject(new Error("Usuario no existe")); }  
            
    //         editUsuario.Nombres = usuarioDTO.Nombres;
    //         editUsuario.Apellidos = usuarioDTO.Apellidos;
    //         editUsuario.Celular = usuarioDTO.Celular;
    //         editUsuario.NombreUsuario = usuarioDTO.NombreUsuario;
    //         editUsuario.Contrasena = usuarioDTO.Contrasena;
    //         editUsuario.EsHabilitado = usuarioDTO.EsHabilitado;

    //         if(usuarioDTO.IdRol != 0){
    //             let rolService = new RolService();
    //             let resultRol  = await rolService.obtenerRolModel(usuarioDTO.IdRol) 
    //             editUsuario.RolesIdRoles = resultRol
    //         }
    //         if(usuarioDTO.IdSucursal != 0){
    //             let sucursalService = new SucursalService();
    //             let resultSucursal  = await sucursalService.obtenerSucursalModel(usuarioDTO.IdSucursal)                
    //             editUsuario.SurcursalIdSucursal = resultSucursal
    //         }

    //         let result = await this.usuarioService.save(editUsuario);
    //         if(result == null) { return false }
    //         return true;
    //     } catch (error) {
    //         return Promise.reject(new Error("Error | SucursalService | editarUsuario"));
    //     }
    // }
    



}