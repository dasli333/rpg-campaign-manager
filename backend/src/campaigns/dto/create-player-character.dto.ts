import {IsNotEmpty, IsString} from "class-validator";

export class CreatePlayerCharacterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly className: string;
  // TODO: Add more fields
}
