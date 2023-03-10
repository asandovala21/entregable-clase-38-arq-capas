import productosApi from '../../api-capa-servicio/productos.js'

import { logError } from '../../loggers/index.js'

async function manejarEnvĂ­oDeProductos() {
    try {
        const productos = await productosApi.listarAll();
        return productos
    } catch (error) {
        logError(error.message)
        return []
    }
}

export default async function configurarSocket(socket, sockets) {
    socket.emit('productos', await manejarEnvĂ­oDeProductos());

    socket.on('update', async producto => {
        try {
            await productosApi.guardar(producto)
        } catch (error) {
            logError(`error al guardar producto:

${error.message}`)
        }

        sockets.emit('productos', await manejarEnvĂ­oDeProductos());
    })
}