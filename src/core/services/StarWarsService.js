const StarWarsClient = require("../clients/StarWarsClient");

class  StarWarsService {
    constructor() {
        //this.starWarsClient = new StarWarsClient();
        this.starWarsClient = new StarWarsClient();

      }
    async getStarWars() {
        try {
            const data = await this.starWarsClient.getStarWars();
            return data; // Retorna los datos obtenidos del cliente
        } catch (error) {
            throw new Error(`Failed to fetch Star Wars data: ${error.message}`);
        }
    }
}
module.exports = StarWarsService;

