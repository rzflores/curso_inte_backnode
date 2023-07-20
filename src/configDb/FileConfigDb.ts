import { DataSource } from "typeorm"

export const dbConect = new DataSource({
    type: "mysql",
    host : "db-mysql-sfo3-04155-do-user-14396833-0.b.db.ondigitalocean.com",
    port : 25060 ,
    username: "test",
    password: "AVNS_1gPuzAKCLgRTUHAtvaA",
    database : "dbsiskardexventas",
    migrations: ["../migrations/*.ts"],
    migrationsTableName: "migrations",
    entities : [ "./src/entity/**/*.ts"  ],
    synchronize: true,
    migrationsRun : true,
    logging: false,
    ssl: true

})


