import { Injectable } from '@nestjs/common';
import { CreatePlayerCharacterDto } from './dto/create-player-character.dto';
import { UpdatePlayerCharacterDto } from './dto/update-player-character.dto';

@Injectable()
export class PlayerCharactersService {
  create(createPlayerCharacterDto: CreatePlayerCharacterDto) {
    return 'This action adds a new playerCharacter';
  }

  findAll() {
    return `This action returns all playerCharacters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playerCharacter`;
  }

  update(id: number, updatePlayerCharacterDto: UpdatePlayerCharacterDto) {
    return `This action updates a #${id} playerCharacter`;
  }

  remove(id: number) {
    return `This action removes a #${id} playerCharacter`;
  }
}
