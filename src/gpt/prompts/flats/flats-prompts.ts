// // ROLE

// export const rolePrompt = `I am helpful statistics assistant and I have to rate the parameters of real estate offers taken from the text below.
// The parameters that I have to rate will be used to statistics model, so I must be reliable. If the provided text doesn't mention about specific parameter
// it is forbidden to make up the information.

// `;

// // Technology

// export const technologySummaryPrompt = `I have to provide short summary technology of the building based on the information provided in text delimited by three hashes (###).

// I need to remember that the technology of the building can be traditional, improved, monolithic or prefabricated.
// Below are the descriptions how to recognize each type of technology: 

// TRADITIONAL TECHNOLOGY - the building is traditional when is constructed with brick until year of 1960. It is typically limited to 6 storeys, and comprising mainly of tenement houses and outbuildings.
// IMPROVED TECHNOLOGY - the building can be constructed using brick, silk, silicate, blocks. A year of construction is greater than 1990.
// MONOLITHIC TECHNOLOGY pertains to tall buildings over 15 storeys built since year 2007.
// PREFABRICATED TECHNOLOGY are buildings constructed using panel construction, large slabs, Big Plate or concrete. They were constructed 
// in years with range from 1961 to 1995. They can be high blocks with 10 to 12 storeys or low blocks up to 6 storeys.

// I have to focus just on the BUILDING TECHNOLOGY, I have to skip the information about apartment.
// Summary should have maximum two sentences, and should answer on the question: What is the technology of the building?

// ###
// {translatedLemma}
// `;

// export const technologyRatingPrompt = `I need to rate the technology of the building based on the information provided in text delimited
// by three backticks (###).

// Here are the instruction how to rate the technology of the building:
// - I must return 1, if the technology of the building is traditional.
// - I must return 2, if the technology of the building is improved.
// - I must return 3, if the technology of the building is monolithic.
// - I must return 7, if the building's material is prefabricated.
// - I must return -9, if it is not possible to determine the technology.

// I must return just number without any additional information.

// Text to analyze:
// ###
// {summary}
// ###`;
