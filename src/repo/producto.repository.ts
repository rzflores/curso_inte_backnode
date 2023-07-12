import { AgregarProductoDTO } from "../DTO/AgregarProductoDTO";
import { FiltrosStockDTO } from "../DTO/FiltrosStockDTO";
import { FiltrosVencimientoDTO } from "../DTO/FiltrosVencimientoDTO";
import { ProductoDTO } from "../DTO/ProductoDTO";
import { MenuInterface } from "../types/menu.type";
import { ProductoInterface } from "../types/producto.type";
import { ReporteStock, ReporteVencimiento } from "../types/reporte.type";

export interface ProductoRepository{
    obtenerProducto( IdProducto : number  ) : Promise<ProductoInterface>
    obtenerProductos( IdSucursal : number ) : Promise<ProductoInterface[]>
    registrarProducto(agregarProductoDTO: AgregarProductoDTO) : Promise<Boolean>
    editarProducto(productoDTO: ProductoDTO) : Promise<Boolean>
    obtenerReporteStock(filtroStock: FiltrosStockDTO) : Promise<ReporteStock[]>
    obtenerReporteVencimiento(filtroVencimiento: FiltrosVencimientoDTO) : Promise<ReporteVencimiento[]>
    
}
