
export interface HouseRecord {
    houseNumber: number;
    id?: string;
    market?: string;
    offerId: string;
    offerIdExpected: string;
    offerType: string;
    offerStatus: string;
    dateAdded: Date;
    dateChanged?: Date;
    dateUpdated: Date;
    dateEndTransaction?: Date;
    localization: string;
    street?: string;
    lawStatus?: string;
    price: number;
    priceOffer?: number;
    priceSold?: number;
    livingArea?: number;
    houseArea?: number;
    plotArea?: number;
    houseQuality?: string;
    priceM2?: number;
    houseType?: string;
    buildingQuality?: string;
    material?: string;
    yearBuilt?: number;
    parkingPlace?: string;
    floorsNumber?: number;
    garagesNumber?: number;
    roomsNumber?: number;
    kitchenType?: string;
    bathsNumber?: number;
    basement?: string;
    lotShape?: string;
    garden?: string;
    fence?: string;
    monitoring?: string;
    security?: string;
    guardedArea?: string;
    guardedEstate?: string;
    securityControl?: string;
    description?: string;

    garageLemma?: string;
    modernizationLemma?: string;
    monitoringLemma?: string;
    legalStatusLemma?: string;
    buildingTypeLemma?: string;
    kitchenLemma?: string;
    bathroomLemma?: string;
    streetLemma?: string;
}

export type HouseListResponse = HouseRecord[];
export type OneHouseResponse = HouseRecord;
