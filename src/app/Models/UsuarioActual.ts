export interface UsuarioActual {
    tipo: string; // Cambiado a "tipo" con minúscula
    datos: {
        idOrganizacion: number;
        nombreOrg: string;
        ruc: string;
        username: string;
        password?: string; // Si no necesitas mostrar la contraseña, puedes dejarla opcional
        celular: string;
        administradorId: number;
    };
}
