import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientModule} from './patient/patient.module';
import {MailModule} from './mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        PatientModule,
        MailModule
    ],
})
export class AppModule {

}
