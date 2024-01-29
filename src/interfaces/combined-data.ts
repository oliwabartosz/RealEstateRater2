import {FlatRecord} from "./flat-record";
import {HouseRecord} from "./house-record";
import {PlotRecord} from "./plot-record";
import {FlatAnswersRecord} from "./flat-answers-record";
import {HouseAnswersRecord} from "./house-answers-record";
import {PlotAnswersRecord} from "./plot-answers-record";
import {FlatGPTRecord} from "./flat-gpt-record";


export type RealEstateRecord = FlatRecord | HouseRecord | PlotRecord;
export type RealEstateRecords = Array<RealEstateRecord>;

export type RealEstateAnswersRecord = FlatAnswersRecord | HouseAnswersRecord | PlotAnswersRecord;
export type RealEstateAnswersRecords = Array<RealEstateAnswersRecord>;

export type RealEstateGPTRecord = FlatGPTRecord;
export type RealEstateGPTRecords = Array<RealEstateGPTRecord>;