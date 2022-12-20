import express from 'express';
import {Server as HTTPServer} from 'http';
import {Server as IOServer} from 'socket.io';
import ContainerSql from './container/ContainerSql.js';
import configClient from './configClient.js';

const app = express()
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

const productos = new ContainerSql(configClient.mariaDb, 'productos')
const mensajes = new ContainerSql(configClient.sqlite3, 'mensajes')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

io.on('connection', socket => {
    console.log('Nuevo usuario conectado');

    const emitMensajes = async () =>{
        const mensajes = await mensajes.getAll()
        io.emit('server: loadMessages', mensajes)
    }
    emitMensajes()

    socket.on('newMessage', async data => {
        await mensajes.save(data)
    })

    const emitProductos = async () =>{
        const productos = await productos.getAll()
        io.emit('server: loadProducts', productos)
    }
    emitProductos()

    socket.on('newProduct', async data => {
        await productos.save(data)
    })
})

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

server.on('error', error => console.log(`Error ${error}`))




