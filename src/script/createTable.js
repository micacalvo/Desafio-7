import knexConection from "../configClient.js";

//Función autoejecutable. Creación de tablas
(async () => {
    try {
        console.log("inicializing migrate script...")
        await knexConection.schema.dropTableIfExists('productos')
        await knexConection.schema.dropTableIfExists('mensajes')

        await knexConection.schema.createTable("productos", (table) => {
            table.increments("id").primary()
            table.string("name").notNullable()
            table.string("price").notNullable()
        })

        await knexConection.schema.createTable("mensajes", (table) => {
            table.increments("id").primary()
            table.string("user").notNullable()
            table.string("message").notNullable()
        })
    }
    catch(error){
        console.log(error)
    }
    finally{
        console.log("finalizing migrate script...")
        knexConection.destroy()
    }
})()