export interface AgregarProductoDTO{
    NombreProducto : string,
    DescripcionCorta : string,
    DescripcionLarga : string,
    PrecioUnitario : number,
    StockActual : number,
    UrlImagen : string,
    FechaVencimiento : string
    IdCategoria : number,
    IdUnidadMedida : number,
    IdSucursal : number
}