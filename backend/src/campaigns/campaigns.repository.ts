import {Campaign} from "./entities/campaign.entity";
import {UpdateCampaignDto} from "./dto/update-campaign.dto";
import {CreateCampaignDto} from "./dto/create-campaign.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {NotFoundException} from "@nestjs/common";

export class CampaignsRepository {

  constructor(@InjectModel('Campaign') private campaignModel: Model<Campaign>){}
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
    await this.campaignModel.findByIdAndDelete(id).exec();
  }
}