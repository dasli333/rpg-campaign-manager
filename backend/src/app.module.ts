import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CampaignsModule} from './campaigns/campaigns.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path'

@Module({
  imports: [
    CampaignsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/rpg'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
