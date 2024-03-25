import {Schema} from "mongoose";

export const CampaignSchema = new Schema({
  title: String,
  description: String,
  startDate: Date,
  gameSystem: String,
  image: String,
  endDate: Date,
});