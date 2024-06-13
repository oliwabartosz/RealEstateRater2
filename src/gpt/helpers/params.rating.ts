import {
  building_type_prompt,
  material_prompt,
  number_floors_prompt,
  year_of_constr_prompt,
} from '../prompts/flats/params';
import { generateChainAndInvoke } from './langchain-wrapper';

export async function rateParams(
  id: string,
  yearBuilt: number,
  material: string,
  buildingType: string,
  floorsNumber: number,
  description: string,
): Promise<{
  yearBuilt: number;
  material: string;
  buildingType: string;
  floorsNumber: number;
}> {
  let generatedYearBuilt;
  let generatedMaterial;
  let generatedBuildingType;
  let generatedFloorsNumber;

  if (
    Number(yearBuilt) < 1800 ||
    material === null ||
    material === '' ||
    buildingType === null ||
    buildingType === '' ||
    floorsNumber === null
  ) {
    const descriptionEN = this.translateWithGPT(description, 'pl_en');

    if (Number(yearBuilt) < 1800) {
      generatedYearBuilt = await generateChainAndInvoke(
        year_of_constr_prompt,
        this.modelName,
        this.creativity,
        { real_estate_offer: descriptionEN },
      );

      if (!Number.isNaN(Number(generatedYearBuilt))) {
        this.flatsAnswerService.createOrUpdateAnswer(id, 'ai', {
          flatID: id,
          yearBuiltAns: Number(generatedYearBuilt),
        });
      }
    }

    if (material === null || material === '') {
      generatedMaterial = await generateChainAndInvoke(
        material_prompt,
        this.modelName,
        this.creativity,
        { real_estate_offer: descriptionEN },
      );
    }

    if (buildingType === null || buildingType === '') {
      generatedBuildingType = await generateChainAndInvoke(
        building_type_prompt,
        this.modelName,
        this.creativity,
        { real_estate_offer: descriptionEN },
      );
    }

    if (floorsNumber === null) {
      generatedFloorsNumber = await generateChainAndInvoke(
        number_floors_prompt,
        this.modelName,
        this.creativity,
        { real_estate_offer: descriptionEN },
      );
    }
  }

  return {
    yearBuilt: generatedYearBuilt || yearBuilt,
    material: generatedMaterial || material,
    buildingType: generatedBuildingType || buildingType,
    floorsNumber: generatedFloorsNumber || floorsNumber,
  };
}
