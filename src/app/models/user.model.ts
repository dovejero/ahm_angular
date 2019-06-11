export class User {
    rol: string;
    nombre: string;
    logo: string;
    imagen: string;
    activado: boolean;
    fk_usuario: number;

    constructor(pRol, pNombre = "", pLogo = "", pImagen = "", pActivado = false, pfk_usuario = 0) {
        this.rol = pRol;
        this.nombre = pNombre;
        this.logo = pLogo;
        this.imagen = pImagen;
        this.activado = pActivado;
        this.fk_usuario = pfk_usuario;
    }
}