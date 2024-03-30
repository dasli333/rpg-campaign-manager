import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateCampaignDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    title: string;

    @IsString()
    @MaxLength(300)
    description: string;

    @IsNotEmpty()
    @IsString()
    gameSystem: string;

    image: string;
}
