export default {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./db/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'srbrisa14',
            database: 'dbbackend_⁮mica',
            port: '8889'
        }
    }
}


