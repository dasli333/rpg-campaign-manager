import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerCharactersService } from './player-characters.service';
import { CreatePlayerCharacterDto } from './dto/create-player-character.dto';
import { UpdatePlayerCharacterDto } from './dto/update-player-character.dto';

@Controller('player-characters')
export class PlayerCharactersController {
  constructor(private readonly playerCharactersService: PlayerCharactersService) {}

  @Post()
  create(@Body() createPlayerCharacterDto: CreatePlayerCharacterDto) {
    return this.playerCharactersService.create(createPlayerCharacterDto);
  }

  @Get()
  findAll() {
    return this.playerCharactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerCharactersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerCharacterDto: UpdatePlayerCharacterDto) {
    return this.playerCharactersService.update(+id, updatePlayerCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerCharactersService.remove(+id);
  }
}
