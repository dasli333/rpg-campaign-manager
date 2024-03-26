import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import {CampaignsRepository} from "./campaigns.repository";
import {Types} from "mongoose";

@Injectable()
export class CampaignsService {

  constructor(private readonly campaignsRepository: CampaignsRepository) {}
  create(createCampaignDto: CreateCampaignDto) {
    return this.campaignsRepository.create(createCampaignDto);
  }

  findAll() {
    return this.campaignsRepository.findAllCampaigns();
  }

  findOne(id: string) {
    return this.campaignsRepository.findOne(id);
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsRepository.update(id, updateCampaignDto);
  }

  remove(id: number) {
    return this.campaignsRepository.remove(id);
  }
}
