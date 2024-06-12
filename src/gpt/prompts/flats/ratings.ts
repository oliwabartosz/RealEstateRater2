//RATINGS
export const technologyRatingPrompt = `Please rate the technology of the building based on the information provided in text delimited 
by three hashes (###)

Here is instruction how to rate the technology of the building:
- RETURN 1 if the technology of the building is traditional.
- RETURN 2 if the technology of the building is traditional but improved.
- RETURN 3 if the technology of the building is monolithic.
- RETURN 7 if the building's material is prefabricated 7.
- RETURN -9 if it is not possible to determine the technology.

Please provide just a numeric response: 1, 2, 3, 7, or -9. Do not provide any additional text!

Text to analyze:
###{summary}###`;

export const technologyRatingPromptExamples = `Examples of summaries and desired output is listed below delimited by three dashes (-).

---
Example:
Summary: The technology classification of the building is traditional.
Output: 1

Summary: The building was constructed in years with range from 1960 to 1995.
Output: 7

Summary: The building was constructed in years with range from 1960 to 1995 and has more than 7 floors.
Output: 7

Summary: The material used for construction of building is silikat or silicate.
Output: 2

Summary: The year of construction is greater than 1990.
Output: 2

Summary: The building has more than 13 floors and the year of construction is greater than 2005.
Output: 3.

Summary: It is hard to estimate the building technology base on given information.
Output: -9
---

Please provide a numeric response: 1, 2, 3, 7, or -9. Do not provide text!`;

export const legalStatusRatingPrompt = `Please rate the legal status based on the information provided in text delimited by three 
hashes (###).
- RETURN 1 if the legal status of an apartment is ownership.
- RETURN 2 if the legal status of an apartment is cooperative ownership right (it can be called also with the Land and Mortgage Register or KW), 
- RETURN 2 if text mentions that apartment is possible to buy by citizens from outside the European Union return 2
- RETURN -9 if you don't know.

Please provide just a numeric response: 1, 2 or -9. Do not provide any additional text!

Text to analyze:
###{summary}###`;

export const legalStatusRatingPromptExamples = `Examples of summaries and desired output is listed below delimited by three dashes (-).

---
Example:
Summary: The legal status of the property mentioned in the text is ownership. There is no mention of community or cooperation in the text.
Output: 1

Summary: The legal status of this property is the cooperative ownership right.
Output: 2 

Summary: The legal status of the property mentioned in the text is the right of cooperative ownership
Output: 2

---

Please provide just a numeric response: 1, 2, or -9. Do not provide text!`;

export const balconyRatingPrompt = `Please rate the presence of a balcony, loggia or terrace based on the information provided in text delimited by three hashes (###). 
- RETURN 1 if apartment has a balcony, terrace, loggia or garden, please return 1.
- RETURN 0 if apartment has not balcony, terrace or loggia please return 0.
- RETURN 0 if apartment has just a French balcony or balcony window return 0,
- RETURN -9 if it is not possible to determine the presence of a balcony, terrace or loggia (there is no information) 

Please provide just a numeric response: 0, 1 or -9. Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const balconyRatingPromptExamples = `
Examples of summaries and desired output are listed below delimited by three dashes (-).

---
Example:
Summary: The apartment has a balcony.
Output: 1

Summary: The apartment has a loggia, but there is no information provided about a balcony.
Output: 1

Summary: The apartment has a terrace, but there is no information provided about a balcony.
Output: 1

Summary: The apartment has a loggia, but there is no information provided about a balcony.
Output: 1

Summary: The apartment doest not have a balcony, terrace, or loggia, but it has garden.
Output: 1

Summary: The apartment has a balcony window.
Output: 0

Summary: The apartment has a french balcony.
Output: 0

Summary: No information about balcony, terrace or loggia in text.
Output: -9
---
Please provide just a numeric response: 0, 1 or -9. Do not provide any additional text!`;

export const elevatorRatingPrompt = `Please rate the presence of an elevator based on the information provided in text delimited by three hashes (###)
- RETURN 1 if there is an elevator or building has more than 5 floors.
- RETURN 0 if there is no elevator or building has less than 5 floors.
- RETURN -9 if it is not possible to determine the presence of an elevator.

Please provide a numeric response: 0, 1 or -9. Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const basementRatingPrompt = `
Rate presence of basement based on the information provided in text delimited by three hashes (###).
- RETURN 0 If there is no basement it comes with an additional price, please return 0.
- RETURN 0 If basement for use by the Cooperative or publicly accessible return 0.
- RETURN 1 If there is a basement mentioned in the text without any information about additional price, 
- RETURN -9 it is not possible to determine a rating, please return -9.

Please provide just a numeric response: 0, 1 or -9. Do not provide any additional text!

NOTE: Treat basement, attic, storage cell as basement. 

Text to analyze:
###{summary}###.`;

export const basementRatingPromptExamples = `Examples of summaries and desired output is listed below delimited by three dashes (-).

---
Example:
Summary: The text does not mention anything about a basement belonging to the apartment.
Output: -9

Summary: The basement is not mentioned in the text, so it is unclear if the apartment has one.
Output: -9

Summary: The apartment has a basement.
Output: 1

Summary: The apartment has a basement, which is included in the price.
Output: 1

Summary: The apartment has a basement, but it is not mentioned whether it belongs to the apartment or if there are any 
additional fees associated with it.
Output: 1

Summary: The apartment includes a basement (with garage or not) for an additional fee.
Output: 0

Summary: The basement is for use by the Cooperative or is publicly accessible.
Output: 0
---

Return just number 0, 1 or -9. Do not provide text!`;

export const garageRatingPrompt = `Please rate the occurrence of a garage or parking place based on the information provided in text delimited by three hashes (###).
- RETURN 0 if there is no garage or parking place with the apartment, or if it comes with an additional price.
- RETURN 0 if text mention about possibility to buy garage or parking place.
- RETURN 1 if the garage or parking place belongs to the apartment without any information about the price.

NOTE: The garage or parking space must be associated with the apartment. Sometimes, the text may indicate that there are general parking spaces available or a shared parking area for residents. In such cases, do not assume that the apartment includes a garage or a dedicated parking space.

Please provide just a numeric response: 0 or 1. Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const garageRatingPromptExamples = `Examples of summaries and desired output is listed below delimited by three dashes (-).

---
Example:
Summary: The text mentions a garage that belongs to the apartment. The garage has an additional price of 80,000.
Output: 0

Summary: The text mentions a parking lot that belongs to the apartment. The parking lot has an additional price of 60 000.
Output: 0

Summary: The text mentions that there is possibility of buying the parking place.
Output: 0

Summary: The text mentions a garage that belongs to the apartment. The text does not mention about additional price.
Output: 1

Summary: The text mentions a parking lot that belongs to the apartment. The text does not mention about additional price.
Output: 1
---

Please provide a numeric response: 0, 1, or -9. Do not provide text!`;

export const gardenRatingPrompt = `Please rate the occurrence of a garden  based on the information provided in text delimited by three hashes (###).
- RETURN 0 if there is no garden, or if it comes with an additional price or is it unclear to asses.
- RETURN 1 if the garden belongs to the apartment.
- RETURN -9 if it is not possible to determine a rating.

Please provide just a numeric response: 0, 1 or -9. Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const monitoringRatingPrompt = `Please rate the occurrence of monitoring based on the information provided in text delimited by three hashes (###).
- RETURN 0 if there is no mention of monitoring of the building, building is on guarded estate or has supervision, or protection.
- RETURN 1 if there is any mention of monitoring of the building, building is on guarded estate, supervision, or protection.
- RETURN -9 if it is hard to asses.

Please provide just a numeric response: 0, 1 or -9. Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const monitoringRatingPromptExamples = `Examples of summaries and desired output is listed below delimited by three dashes (-).

---
Example:
Summary: The apartment is located in a monitored area within a guarded housing estate. The building itself is not mentioned to be monitored.
Output: 1

Summary: The building, block is monitored and located in a guarded housing estate. There is supervision and protection in place
Output: 1

Summary: Text mentions that area outside building or block is monitored.
Output: 1

Summary: The text does not provide any information about monitoring, whether the building is monitored or if there is supervision and protection.
Output: -9

Summary: It is not possible to determine if the building is monitored or located in a guarded housing estate based on the given text.
Output: -9

Summary: It is not possible to determine if monitoring is mentioned in the text.
Output: -9
---

Please provide a numeric response: 1 or -9. Do not provide text!`;

export const kitchenRatingPrompt = `Please rate the occurrence of a kitchen based on the information provided in text delimited by three hashes (###).
- RETURN 1 if it has been mentioned that the kitchen is dark.
- RETURN 2 if it has been mentioned that the kitchen is bright, well-lit, has a window or kitchen is combined with a dining room.
- RETURN 3 if it has been mentioned that the kitchen is an annex or kitchen is combined with a living room.
- RETURN -9 if it is not possible to determine a rating.

Please provide just a numeric response: 1, 2, 3, or -9. Do not provide any additional text!`;

export const rentRatingPrompt = `Please provide a just numeric response that indicate the value of administrative rent from the 
information provided in text delimited by three hashes (###). 

RETURN just number and skip the text.
RETURN -9 if it is not possible to determine a rating. 

Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const modernizationRatingPrompt = `Please rate the modernization based on the information provided in text delimited by three hashes (###). 

The technology of building was rated as: {technology_rating}, and the building was built in {year_of_built}

- RETURN 4 if the building was mentioned to be modernized, renovated, or insulated it was built before 1995 or it's technology rating is 1 or 7. 
- RETURN 5 if it has been mentioned that building was not modernized or will be modernized in the future.
- RETURN -9 if it is not possible to determine a rating

NOTE: Prefabricated buildings (which have technology rating as 7) are most likely modernized.
SECOND NOTE: Treat roof replacement as modernization of the building and ignore instructions about technology rating and the year of building construction.
IMPORTANT: It is all about the building. IGNORE information about apartment itself. 

Please provide just a numeric response: 4, 5, null or -9. Do not provide any additional text!

Text to analyze:
###{summary}###.`;

export const outbuildingRatingPrompt = `Please rate the occurrence of a tenement house (called sometimes also outbuilding) based on the information provided 
in text delimited by three hashes (###). 

The technology of building was rated as: {technology_rating}.

RETURN 1 if it has been mentioned that building is a tenement house.
RETURN 1 if it has been mentioned that building is located in the second line of development and technology of building was rated as 1.
RETURN 0 if the technology of the building is something else than 1.
RETURN 0 if it is not possible to determine a rating.

Please provide just a numeric response: 0, 1. Do not provide any additional text!

Text to analyze:
###{summary}###.`;
