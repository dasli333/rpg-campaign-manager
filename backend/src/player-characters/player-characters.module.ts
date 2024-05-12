import { Module } from '@nestjs/common';
import { PlayerCharactersService } from './player-characters.service';
import { PlayerCharactersController } from './player-characters.controller';

@Module({
  controllers: [PlayerCharactersController],
  providers: [PlayerCharactersService],
})
export class PlayerCharactersModule {}
