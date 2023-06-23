import { DataSource } from "typeorm"

export const dbConect = new DataSource({
    type: "mysql",
    host : "localhost",
    port : 33060 ,
    username: "root",
    password: "123456",
    database : "dbsiskardexventas",
    migrations: ["../migrations/*.ts"],
    migrationsTableName: "migrations",
    entities : [ "./src/entity/**/*.ts"  ],
    synchronize: true,
    migrationsRun : true,
    logging: false,

})


