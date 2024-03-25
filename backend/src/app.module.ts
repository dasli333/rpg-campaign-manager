import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [CampaignsModule, MongooseModule.forRoot('mongodb://localhost:27017/rpg')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
