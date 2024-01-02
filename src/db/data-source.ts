import {DataSource, DataSourceOptions} from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "mariadb",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/db/migrations/*.js"],
    bigNumberStrings: false,
    logging: false,
    synchronize: true,
};


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

async function initializeDataSource(): Promise<void> {
    try {
        await dataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization", err);
    }
}


initializeDataSource();
