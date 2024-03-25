export interface Campaign extends Document {
    id: number;
    title: string;
    description?: string;
    startDate: Date;
    gameSystem: string;
    image?: string;
    endDate?: string;
}
