import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerCharacterDto } from './create-player-character.dto';

export class UpdatePlayerCharacterDto extends PartialType(CreatePlayerCharacterDto) {}
