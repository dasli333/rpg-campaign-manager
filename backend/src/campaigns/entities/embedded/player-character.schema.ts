import {Schema} from "mongoose";

export const PlayerCharacterSchema = new Schema({
    name: String,
    player: String,
    class: String,
})