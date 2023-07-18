export interface ReporteStock{
    IdProducto : number;
    nombreProducto : string,
    descripcionProducto : string
    nombreCategoria : string
    stockProducto : number
    nombreSucursal : string 
}

export interface ReporteVencimiento{
    IdProducto : number;
    nombreProducto : string,
    descripcionProducto : string
    nombreCategoria : string
    fechaVencimiento : string
    nombreSucursal : string 
}