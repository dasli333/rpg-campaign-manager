import {Schema} from "mongoose";

export const StoryLogSchema = new Schema({
    date: {type: Date, default: Date.now},
    entry: String,
});