import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateStoryLogDto} from "./dto/create-story-log.dto";
import {CreatePlayerCharacterDto} from "./dto/create-player-character.dto";



@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File, @Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto, file);
  }

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.campaignsService.remove(id);
  }

  // STORY LOGS
  @Post(':id/story-log')
  addStoryLog(@Param('id') id: string, @Body() storyLog: CreateStoryLogDto) {
    return this.campaignsService.addStoryLog(id, storyLog);
  }

  @Patch(':id/story-log/:storyLogId')
  updateStoryLog(@Param('id') id: string, @Param('storyLogId') storyLogId: string, @Body() storyLog: CreateStoryLogDto) {
    return this.campaignsService.updateStoryLog(id, storyLogId, storyLog);
  }

  @Delete(':id/story-log/:storyLogId')
  deleteStoryLog(@Param('id') id: string, @Param('storyLogId') storyLogId: string) {
    return this.campaignsService.deleteStoryLog(id, storyLogId);
  }

  //PLAYER CHARACTERS
  @Post(':id/player-character')
  @UseInterceptors(FileInterceptor('image'))
  addPlayerCharacter(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() playerCharacter: CreatePlayerCharacterDto) {
    return this.campaignsService.addPlayerCharacter(id, playerCharacter, file);
  }

  @Delete(':id/player-character/:playerCharacterId')
  deletePlayerCharacter(@Param('id') id: string, @Param('playerCharacterId') playerCharacterId: string) {
    return this.campaignsService.deletePlayerCharacter(id, playerCharacterId);
  }

  @Patch(':id/player-character/:playerCharacterId')
  @UseInterceptors(FileInterceptor('image'))
  updatePlayerCharacter(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Param('playerCharacterId') playerCharacterId: string, @Body() playerCharacter: any) {
    return this.campaignsService.updatePlayerCharacter(id, playerCharacterId, playerCharacter, file);
  }
}
