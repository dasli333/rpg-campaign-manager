import {Injectable} from '@nestjs/common';
import {CreateCampaignDto} from './dto/create-campaign.dto';
import {UpdateCampaignDto} from './dto/update-campaign.dto';
import {CampaignsRepository} from "./campaigns.repository";
import * as fs from "fs";
import * as path from "path";
import {v4 as uuidv4} from 'uuid';
import {CreateStoryLogDto} from "./dto/create-story-log.dto";

@Injectable()
export class CampaignsService {

  constructor(private readonly campaignsRepository: CampaignsRepository) {
  }

  create(createCampaignDto: CreateCampaignDto, file: Express.Multer.File) {
    if (file) {
      const uploadPath = 'public/images';
      const fileExtension = path.extname(file.originalname);
      const uniqueFilename = uuidv4() + fileExtension;
      const filePath = path.join(uploadPath, uniqueFilename);

      fs.mkdirSync(uploadPath, {recursive: true});
      fs.writeFileSync(filePath, file.buffer);

      createCampaignDto.image = uniqueFilename;
    }

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

  // STORY LOGS
  addStoryLog(id: string, storyLog: CreateStoryLogDto) {
    return this.campaignsRepository.addStoryLog(id, storyLog);
  }

  updateStoryLog(id: string, storyLogId: string, storyLog: CreateStoryLogDto) {
    return this.campaignsRepository.updateStoryLog(id, storyLogId, storyLog);
  }

  deleteStoryLog(id: string, storyLogId: string) {
    return this.campaignsRepository.deleteStoryLog(id, storyLogId);
  }
}
