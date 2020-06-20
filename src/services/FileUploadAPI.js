import axios from 'axios';

class FileUploadAPI {
  static uploadFile(file) {
    const url = process.env.REACT_APP_CLOUNDINARY_API;
    const uploadPreset = process.env.REACT_APP_PRESET_NAME;
    const fileData = new FormData();
    fileData.append('file', file);
    fileData.append('upload_preset', uploadPreset);
    return axios.post(url, fileData);
  }
}

export default FileUploadAPI;
