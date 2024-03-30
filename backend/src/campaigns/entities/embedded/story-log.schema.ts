import {Schema} from "mongoose";

export const StoryLogSchema = new Schema({
    date: Date,
    entry: String,
});