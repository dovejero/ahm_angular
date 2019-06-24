export class Banda {
    rol: string;
    nombre: string;
    logo: string;
    imagen: string;
    bio: string;
    componentes: number;
    tipo: string[];
    provincia: string;
    localidad: string;
    lat: number;
    lng: number;
    dosier: string;
    redes: string[];
    comentario: string;
    activado: boolean;
    fk_usuario: number;

    constructor(pRol, pNombre = "", pLogo = "", pImagen = "", pBio = "", pComponentes = 0, pTipo = "", pProvincia = "", pLocalidad = "", pLat = null, pLng = null, pDosier = "", pRedes = "", pComentario = "", pActivado = false, pfk_usuario = 0) {
        this.rol = pRol;
        this.nombre = pNombre;
        this.logo = pLogo;
        this.imagen = pImagen;
        this.bio = pBio;
        this.componentes = pComponentes;
        this.tipo = pTipo.split(',');
        this.provincia = pProvincia;
        this.localidad = pLocalidad;
        this.lat = pLat;
        this.lng = pLng;
        this.dosier = pDosier;
        this.redes = pRedes.split(',');
        this.comentario = pComentario;
        this.activado = pActivado;
        this.fk_usuario = pfk_usuario;
    }
}