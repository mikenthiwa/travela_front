import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class TravelCostsAPI {
  static async getTravelCostsByLocation({locations}){
    const travelCostsAPIResponse = await axios.get(`${baseUrl}/travelCosts`, { params: {
      locations
    }});
    return travelCostsAPIResponse;
  }
}

export default TravelCostsAPI;
