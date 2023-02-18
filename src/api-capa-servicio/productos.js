import config from '../config.js'

import ContenedorArchivo from '../contenedores-capa-persistencia/ContenedorArchivo.js'
// import ContenedorMongoDb from '../contenedores/ContenedorMongoDb.js'

const productosApi = new ContenedorArchivo(`${config.fileSystem.path}/productos.json`)
// const productosApi2 = new ContenedorMongoDb('productos', {
//     productos: { type: [], required: true }
// })

export default productosApi