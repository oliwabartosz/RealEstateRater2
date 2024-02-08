
export interface PlotRecord {
    id?: string;
    plotNumber: number | null;
    market?: string | null;
    offerId: string | null;
    offerIdExpected: string | null;
    offerType: string | null;
    offerStatus: string | null;
    dateAdded: Date | null;
    dateChanged?: Date | null;
    dateUpdated: Date | null;
    dateEndTransaction?: Date | null;
    localization: string | null;
    street?: string | null;
    legalStatus?: string | null;

    price: number | null;
    priceOffer?: number | null;
    priceSold?: number | null;
    plotArea?: number | null;
    priceM2?: number | null;
    plotWidth?: number | null;
    plotLength?: number | null;

    electricity?: string | null;
    water?: string | null;
    gas?: string | null;
    sewers?: string | null;
    buildingConditions?: string | null;
    buildingPermit?: string | null;
    localPlan: string | null;
    plotPurpose: string | null;
    plotPurposeInPlan: string | null;
    accessRoad: string | null;
    lotShape: string | null;
    waterIntake: string | null;
    sewageType: string | null;
    fence: string | null;
    buildingOnPlot: string | null;

    description: string;
    houseTypeLemma: string;
    electricityLemma: string;
    gasLemma: string;
    waterLemma: string;
    sewersLemma: string;
    buildingOnPlotLemma: string;
    roadLemma: string;
    legalStatusLemma: string;
    fenceLemma: string;
    lotShapeLemma: string;
    planningLemma: string;
    buildingAllowanceLemma: string;

}

export type PlotsListResponse = PlotRecord[];
export type OnePlotsResponse = PlotRecord;
