import mensajesApi from '../../api-capa-servicio/mensajes.js'
import { logError } from '../../loggers/index.js';
import { normalizarMensajes } from '../../normalizacion/index.js'

async function manejarEnvĂ­oDeMensajes() {
    try {
        const mensajes = await mensajesApi.listarAll()
        return normalizarMensajes(mensajes)
    } catch (error) {
        logError(error.message)
        return []
    }
}

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', await manejarEnvĂ­oDeMensajes());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        sockets.emit('mensajes', await manejarEnvĂ­oDeMensajes());
    })
}