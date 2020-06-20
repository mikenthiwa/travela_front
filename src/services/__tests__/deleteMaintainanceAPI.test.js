import moxios from 'moxios';
import MaintainaceApi from '../MaintainaceApi';
const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('MaintainanceApi', () => {
    beforeEach(() => {
      moxios.install();
    });
  
    afterEach(() => {
      moxios.uninstall();
    });

    it ('should send a DELETE request to the API', async () => {
        const roomId = 'room-id-1';
        moxios.stubRequest(`${baseUrl}/room/${roomId}/maintainance`, {
            status: 200,
            response: {
                "success": true,
                "message": "Maintenance record deleted successfully"
            }
          });
          const response = await MaintainaceApi.deleteMaintenanceRecord(roomId);
          expect(moxios.requests.mostRecent().url).toEqual(
            `${baseUrl}/room/${roomId}/maintainance`
          );
          expect(moxios.requests.mostRecent().config.method).toEqual('delete');
          expect(response.data).toEqual({
            message: 'Maintenance record deleted successfully',
            success: true
          });
    });
});
