export class Sala {
    rol: string;
    nombre: string;
    logo: string;
    imagen: string;
    info: string;
    horario: string;
    aforo: number;
    provincia: string;
    localidad: string;
    localizacion: string;
    lat: number;
    lng: number;
    redes: string[];
    comentario: string;
    activado: boolean;
    fk_usuario: number;

    // constructor(values) {

    // }

    constructor(pRol, pNombre = "", pLogo = "", pImagen = "", pInfo = "", pHorario = "", pAforo = 0, pProvincia = "", pLocalidad = "", pLocalizacion = "", pLat = null, pLng = null, pRedes = "", pComentario = "", pActivado = false, pfk_usuario = 0) {
        this.rol = pRol;
        this.nombre = pNombre;
        this.logo = pLogo;
        this.imagen = pImagen;
        this.info = pInfo;
        this.horario = pHorario;
        this.aforo = pAforo;
        this.provincia = pProvincia;
        this.localidad = pLocalidad;
        this.localizacion = pLocalizacion;
        this.lat = pLat;
        this.lng = pLng;
        this.redes = pRedes.split(',');
        this.comentario = pComentario;
        this.activado = pActivado;
        this.fk_usuario = pfk_usuario;
    }
}