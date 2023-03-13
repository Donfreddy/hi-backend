import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  public getPort() {
    return this.getValue('APP_PORT');
  }

  public getClientUrl() {
    return this.getValue('CLIENT_URL');
  }

  public getAPiUrl() {
    return this.getValue('API_URL');
  }

  public getFileDestination() {
    return this.getValue('UPLOADED_FILES_DESTINATION');
  }

  public getJWT() {
    return {
      secretKey:
        this.getValue('JWT_SECRET', false) || 'WelcomeToHouseInnovationGroup',
      expiresIn: this.getValue('JWT_EXPIRATION', false) || '1d',
    };
  }

  public getMailConfig() {
    return {
      host: this.getValue('MAIL_HOST'),
      user: this.getValue('MAIL_USER'),
      password: this.getValue('MAIL_PASSWORD'),
      from: this.getValue('MAIL_FROM'),
    };
  }

  public isProduction() {
    const mode = this.getValue('APP_MODE', false);
    return mode != 'dev';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD', false),
      database: this.getValue('DB_DATABASE'),
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      logging: ['error'],
      // entities: ['**/*.entity{.ts,.js}'],

      // migrationsTableName: 'migration',
      // migrations: ['src/migration/*.ts'],
      // ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  // 'DB_PASSWORD',
  'DB_DATABASE',
]);

export { configService };
