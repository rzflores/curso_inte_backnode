import { MigrationInterface, QueryRunner } from "typeorm";

export class migracionchange1687052875199 implements MigrationInterface {
    name = 'migracionchange1687052875199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_dfb8ba17d2631281f0795fb06e3\``);
        await queryRunner.query(`ALTER TABLE \`productos\` DROP COLUMN \`kardexidKardexIdKardex\``);
        await queryRunner.query(`ALTER TABLE \`sucursales\` CHANGE \`CelularSucursal\` \`CelularSucursal\` int(9) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sucursales\` CHANGE \`CelularSucursal\` \`CelularSucursal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD \`kardexidKardexIdKardex\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_dfb8ba17d2631281f0795fb06e3\` FOREIGN KEY (\`kardexidKardexIdKardex\`) REFERENCES \`kardex\`(\`idKardex\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
