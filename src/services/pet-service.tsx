// import cors from "cors";
import petfinder from "@petfinder/petfinder-js";

const API_KEY = "p5qbixFfDUCj1jXzbDKQgKtfkEQ8N3a26Ag5ONKj7N5EbS4KNq";
const SECRET_KEY = "amiQrkafY2MPAliGerxFRp251GYuyTMROk0mmQ2Y";
const client = new petfinder.Client({ apiKey: API_KEY, secret: SECRET_KEY });


export const findOrganizationByLocation = async (Location) => {
    client.organization.search({ location: location})
    .then((response) => {
        return response.data;
    })
.catch((error) => {
    console.log(error);
    })
};

export const findOrganizationByState = async (state) => {
    client.organization.search({ state: state })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    })
};

