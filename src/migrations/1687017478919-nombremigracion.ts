import { MigrationInterface, QueryRunner } from "typeorm";

export class nombremigracion1687017478919 implements MigrationInterface {
    name = 'nombremigracion1687017478919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\` ADD \`newcolum24\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\` ADD \`newcolum25\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\` DROP COLUMN \`newcolum25\``);
        await queryRunner.query(`ALTER TABLE \`test\` DROP COLUMN \`newcolum24\``);
    }

}
