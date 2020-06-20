import moxios from 'moxios';
import  FileUploadAPI from '../FileUploadAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

class FormDataMock {
  append = jest.fn();
}


global.FormData = FormDataMock;
process.env.REACT_APP_CLOUNDINARY_API =`${baseUrl}/cloudinary/v1_1/authors-haven/image/upload`;

describe('FileUploadAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const url = process.env.REACT_APP_CLOUNDINARY_API;

  it('should send `POST` request to upload file to cloudinary', async () => {
    moxios.stubRequest(url, {
      status: 200,
      response: { secure_url: 'image.com' }
    });

    const response = await FileUploadAPI.uploadFile('test.png');
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(url);
    expect(request.config.method).toEqual('post');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({ secure_url: 'image.com' });
  });
});
