import { MigrationInterface, QueryRunner } from "typeorm";

export class Nombremigracion1687014873858 implements MigrationInterface {
    name = 'Nombremigracion1687014873858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\` DROP COLUMN \`otracolumna\``);
        await queryRunner.query(`ALTER TABLE \`test\` ADD \`otracolumna2\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\` ADD \`newcolum\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\` DROP COLUMN \`newcolum\``);
        await queryRunner.query(`ALTER TABLE \`test\` DROP COLUMN \`otracolumna2\``);
        await queryRunner.query(`ALTER TABLE \`test\` ADD \`otracolumna\` varchar(255) NOT NULL`);
    }

}
