import { MigrationInterface, QueryRunner } from "typeorm";

export class migracion21687147802508 implements MigrationInterface {
    name = 'migracion21687147802508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sucursales\` CHANGE \`CelularSucursal\` \`CelularSucursal\` int(9) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sucursales\` CHANGE \`CelularSucursal\` \`CelularSucursal\` int NOT NULL`);
    }

}
