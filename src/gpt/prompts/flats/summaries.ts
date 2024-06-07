// SUMMARIES
export const balconySummaryPrompt = `Using maximum 3 sentences answer the question: does text mention about balcony, terrace or loggia? 
If text says about french balcony or about balcony window add this information also to your summary.

Make a summary from text below, delimited by triple hashes (###): 
###{lemma}###

While making summary you can take the following additional parameters created by real estate agents:
Number of balconies in the apartment: {balcony_quantity} 
Number of french balconies in the apartment: {french_balcony_quantity}
Number of terraces in the apartment: {terraces_quantity}
Number of loggias in the apartment: {loggias_quantity}
`;

export const technologySummaryPrompt = `Provide a three-sentence summary about TECHNOLOGY OF THE BUILDING based on the information 
from this text delimited by three hashes (###): 

INSTRUCTION HOW TO ASSESS TECHNOLOGY: The building technology can be classified as TRADITIONAL, IMPROVED, MONOLITHIC or PREFABRICATED:
- TRADITIONAL building technology refers to brick construction built up to 1960, typically limited to 6 storeys, and primarily comprising tenement houses (kamienica) and outbuildings.
- IMPROVED building technology involves construction using brick, silicate, and blocks, with a construction year after 1990.
- MONOLITHIC building technology pertains to tall buildings over 15 storeys, built since 2007.
- PREFABRICATED buildings were constructed using panel construction, large slabs (Wielka Płyta), or concrete, between 1960 and 1995. These can be high blocks with 10 to 12 storeys or low blocks up to 6 storeys. Sometimes real estate agents say that material of these buildings is 'mixed'.

SUMMARY: Provide a brief overview of the building's technology, including its year of construction, type, and number of floors. Disregard details regarding apartment adaptations of the attic. If the year of construction pertains to prefabricated buildings but the material used is traditional, note that estimating the building technology is challenging. Exclude information related to apartments and focus solely on the building.

In your summary try to consider also additional parameters of the building which are:
- year of construction: ###{year_built}###, 
- material ###{material}###, 
- building type: ###{building_type}###, 
- number of floors:  ###{number_of_floors}###.

Text to make summary from:
###{lemma}###
`;

export const legalStatusSummaryPrompt = `Make a summary about the legal status of the real estate. Does the text mention about cooperative ownership right 
(called alo social ownership) or ownership right?
Does text say that apartment is possible to buy by citizens from outside the European Union or Ukraine?

Use maximum three sentences. Tell your reasons.

Text to make summary from:
###{lemma}###`;

export const elevatorSummaryPrompt = `Make two sentences summary about elevator in the building from text delimited in triple 
hashes (###). Does building have an elevator? How many floors the building has? 

If in below text there is no information about the quantity of floors, take this additional information: The number of building floors is {number_of_floors}.

Text to make summary from:
###{lemma}###`;

export const basementSummaryPrompt = `Extract and summarize information about the basement, attic, and storage room from the text delimited in triple hashes (###).
In your summary, answer the following questions:
1. Does the basement is available for additional price or fee or is in the price? Note: if there is no information about price treat that there is no additional cost.
2. Is the basement publicly accessible or is for use by the Cooperative? Note: if there is no information treat that basement is for private use.
3. Does the text mention that the apartment has a basement? If so, please do not analyze information about the attic or storage room.

Text to analyze:
###{lemma}###`;

export const basement_prompt_old = `Act as a text summarizer. Treat basement, attic, storage cell as a basement. Then make three 
sentences summary about basement from text delimited in triple hashes (###). The main question is: Does basement belong to 
the apartment? Give the answer to summary. 

Below are additional questions, but if there is no information about these, do not answer:
Does it have additional price or fee? It is in use for cooperative or public access?

Ignore information about garage or underground place. Try to look for a sentence: "The apartment has a basement."
If text doesn't mention whether basement belongs to the apartment or not do not include that information to summary.

Text to analyze:
###{lemma}###`;

export const basement_prompt_old_2 = `. Then your task is to perform the following actions:
1. Find the information about the basement in text delimited in triple hashes (###).
2. Assess if basement is for additional price or fee - if there is no information treat that there is no additional price or fee.
3. Assess if basement is for use by the Cooperative or publicly accessible - if there is no information treat this is private.`;

export const garageSummaryPrompt = `Make three sentences summary about garage and parking place from text delimited in triple 
hashes (###). Does garage or parking place belong to the apartment? Does it have additional price? Does the text mention 
that is to possible to buy garage or parking place? 
###{lemma}###

While making summary you can take the following additional parameters created by real estate agents:
Price of underground parking place: {price_underground},
Price of ground parking place: {price_ground},
`;

export const gardenSummaryPrompt = `Make two sentences summary about garden from text delimited in triple 
hashes (###). Does garden belong to the flat? Does it have additional price? If the garden is located on loggia or terrace
treat that information as there is no garden at all.
###{lemma}###`;

export const monitoringSummaryPrompt = `Make three sentences summary about monitoring from text delimited in triple hashes (###). 
Does building or area near it is being monitored? Is building located in a guarded housing estate? Is there supervision or protection? 
Does text mentions something about monitoring?
If it is not possible to determine, say that. 
###{lemma}###

While making summary you can take the following additional parameters created by real estate agents (answers for questions below can be yes / no / information not provided):
Building is secured? {security}
Whole area near building is guarded? {guarded_area}
Whole estate which building is in is guarded? {guarded_estate}
Building is under security control? {security_control}
`;

export const kitchenSummaryPrompt = `Please provide a three-sentence summary about the kitchen based on the text enclosed 
in triple hashes (###). Could you describe what type of kitchen the apartment has and whether it is an annex? If kitchen 
is open to living room, say that there is an kitchen annex. 
Additionally, mention if the kitchen has a window and is well-lit or if it lacks natural light and appears dark. 
In your summary please also add information if the text mentions about the kitchen combined with the dining room.
If there is no information about these details, kindly indicate so.
###{lemma}###`;

export const rentSummaryPrompt = `What is the administrative rent based on text delimited in triple hashes (###).
###{lemma}###`;

export const outbuildingSummaryPrompt = `Make two sentences summary about outbuilding from text delimited in triple hashes (###) 
Is there any mention of outbuilding in the text? Does the text state that the building 
is located in the second line of development?
###{lemma}###`;

export const modernizationSummaryPrompt = `Provide a two-sentence summary of the building's modernization, based on the text 
enclosed in triple hashes (###). Has the building undergone insulation, modernization, or restoration? If so, 
please specify when these changes were made. Focus solely on information about the building and exclude any 
details about the apartment. Do not make summary of apartment modernization.
###{lemma}###`;
