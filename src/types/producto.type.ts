import { CategoriaInterface } from "./categoria.type";
import { SucursalCategoriaInterface } from "./surcursal.type";
import { UnidadMedidasInterface } from "./unidadMedidas.type";

export interface ProductoInterface{
    IdProducto : number,
    NombreProducto : string,
    DescripcionCorta : string,
    DescripcionLarga : string,
    PrecioUnitario : number,
    StockActual : number,
    UrlImagen : string,
    FechaVencimiento : string
    Categoria : CategoriaInterface,
    Sucursal : SucursalCategoriaInterface,
    UnidadMedida : UnidadMedidasInterface,
}