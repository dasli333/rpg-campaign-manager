import {Campaign} from "./entities/campaign.interface";
import {UpdateCampaignDto} from "./dto/update-campaign.dto";
import {CreateCampaignDto} from "./dto/create-campaign.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {NotFoundException} from "@nestjs/common";
import * as fs from 'fs';
import {CreateStoryLogDto} from "./dto/create-story-log.dto";
import {CreatePlayerCharacterDto} from "./dto/create-player-character.dto";
import {PlayerCharacter} from "./entities/embedded/player-character.interface";

export class CampaignsRepository {

  constructor(@InjectModel('Campaign') private campaignModel: Model<Campaign>) {
  }

  async create(createCampaignDto: CreateCampaignDto) {
    const createdCampaign = new this.campaignModel(createCampaignDto);
    return createdCampaign.save();
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return this.campaignModel.findByIdAndUpdate(id, updateCampaignDto).exec();
  }

  async findAllCampaigns(): Promise<Campaign[]> {
    return this.campaignModel.find().exec();
  }

  async findOne(id: string): Promise<Campaign> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Campaign not found');
    }

    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  async remove(id: number): Promise<void> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (campaign.image) {
      try {
        fs.unlinkSync(`public/images/${campaign.image}`);
      } catch (e) {
        console.log(e);
      }
    }

    await this.campaignModel.findByIdAndDelete(id).exec();
  }

  // STORY LOGS
  async addStoryLog(id: string, storyLog: CreateStoryLogDto) {
    const campaign = await this.campaignModel.findById(id).exec();
    const newStoryLog = {...storyLog, date: new Date()};
    campaign.storyLogs.push(newStoryLog);
    return campaign.save();
  }

  async updateStoryLog(id: string, storyLogId: string, storyLog: CreateStoryLogDto) {
    const campaign = await this.campaignModel.findById(id).exec();
    const storyLogIndex = campaign.storyLogs.findIndex(log => log._id.toString() === storyLogId);
    campaign.storyLogs[storyLogIndex] = {...storyLog};
    return campaign.save();
  }

  async deleteStoryLog(id: string, storyLogId: string) {
    const campaign = await this.campaignModel.findById(id).exec()
    const storyLogIndex = campaign.storyLogs.findIndex(log => log._id.toString() === storyLogId);
    campaign.storyLogs.splice(storyLogIndex, 1);
    return campaign.save();
  }

  // PLAYER CHARACTERS
  async addPlayerCharacter(id: string, playerCharacter: PlayerCharacter) {
    const campaign = await this.campaignModel.findById(id).exec();
    campaign.playersCharacters.push(playerCharacter);
    return campaign.save();
  }
}
