import {IsNotEmpty, IsString} from "class-validator";

export class CreateStoryLogDto {
    @IsString()
    @IsNotEmpty()
    readonly entry: string;
}