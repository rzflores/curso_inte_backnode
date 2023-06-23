import { MigrationInterface, QueryRunner } from "typeorm";

export class migracionfinal1687052756464 implements MigrationInterface {
    name = 'migracionfinal1687052756464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sucursales\` CHANGE \`CelularSucursal\` \`CelularSucursal\` int(9) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sucursales\` CHANGE \`CelularSucursal\` \`CelularSucursal\` int NOT NULL`);
    }

}
