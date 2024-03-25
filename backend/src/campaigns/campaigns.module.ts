import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import {CampaignsRepository} from "./campaigns.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {CampaignSchema} from "./entities/campaign.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'Campaign', schema: CampaignSchema}])],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsRepository],
})
export class CampaignsModule {}
