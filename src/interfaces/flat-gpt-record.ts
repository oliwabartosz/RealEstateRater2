export interface FlatGPTRecord {
    flatID: string;
    technologyGPT: number;
    technologySummary: string;
    legalStatusGPT: number;
    legalSummary: string;
    balconyGPT: number;
    balconySummary: string;
    elevatorGPT: number;
    elevatorSummary: string;
    basementGPT: number;
    basementSummary: string;
    garageGPT: number;
    garageSummary: string;
    gardenGPT: number;
    gardenSummary: string;
    modernizationGPT: number;
    modernizationSummary: string;
    alarmGPT: number;
    alarmSummary: string;
    kitchenGPT: number;
    kitchenSummary: string;
    outbuildingGPT: number;
    outbuildingSummary: string;
    rentGPT: number;
    rentSummary: string;
    qualityGPT: number;
    status: boolean;
}

export type FlatGPTListResponse = FlatGPTRecord[];