
export interface HouseRecord {
    id?: string;
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
    lawStatus?: string | null;
    price: number | null;
    priceOffer?: number | null;
    priceSold?: number | null;
    livingArea?: number | null;
    houseArea?: number | null;
    plotArea?: number | null;
    houseQuality?: string | null;
    priceM2?: number | null;
    houseType?: string | null;
    buildingQuality?: string | null;
    material?: string | null;
    yearBuilt?: number | null;
    parkingPlace?: string | null;
    floorsNumber?: number | null;
    garagesNumber?: number | null;
    roomsNumber?: number | null;
    kitchenType?: string | null;
    bathsNumber?: number | null;
    basement?: string | null;
    lotShape?: string | null;
    garden?: string | null;
    fence?: string | null;
    monitoring?: string | null;
    security?: string | null;
    guardedArea?: string | null;
    guardedEstate?: string | null;
    securityControl?: string | null;
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
