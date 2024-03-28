import {Injectable} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import {CampaignsRepository} from "./campaigns.repository";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class CampaignsService {

  constructor(private readonly campaignsRepository: CampaignsRepository) {}
  create(createCampaignDto: CreateCampaignDto, file: Express.Multer.File) {
    if (file) {
      const uploadPath = 'uploads';
      const filePath = path.join(uploadPath, file.originalname);

      fs.mkdirSync(uploadPath, { recursive: true });
      fs.writeFileSync(filePath, file.buffer);

      createCampaignDto.image = filePath;
    }

    createCampaignDto.startDate = new Date();
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
