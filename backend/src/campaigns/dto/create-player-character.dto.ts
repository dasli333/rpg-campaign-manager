import {IsNotEmpty, IsString} from "class-validator";

export class CreatePlayerCharacterDto {
  @IsString()
  @IsNotEmpty()
  readonly playerCharacter: string;
}
