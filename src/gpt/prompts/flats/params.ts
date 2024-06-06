// PARAMETERS
export const year_of_constr_prompt = `Please return the YEAR OF BUILDING CONSTRUCTION (as number) from the text below delimited by three hashes (###):
###
{real_estate_offer}.
###

If there were no information the YEAR OF BUILDING CONSTRUCTION say: not known`;

export const building_type_prompt = `Please return the BUILDING TYPE from text below delimited by three hashes (###):
###
{real_estate_offer}
###

If there were no information about BUILDING TYPE say: not known`;

export const material_prompt = `Please return the MATERIAL which the building was built from text below delimited by three hashes (###):

###
{real_estate_offer}
###

If there were no information about MATERIAL say: not known`;

export const number_floors_prompt = `Please provide the NUMBER OF FLOORS from text below delimited by three hashes (###):
###
{real_estate_offer_en}
###

Add 1 to the NUMBER OF FLOORS and return the total number. If there were no information about NUMBER OF FLOORS say: not known`;
