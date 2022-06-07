import API from ".";
import env from "../util/env";

const COLLECTION = "/files";

const fileApi = {
  uploadFiles: (files) => {
    const formData = new FormData();
    for (const [index, file] of files.entries()) {
      console.log(file);
      formData.append("myFile"+index, file, file["name"]);
    }
    return API.post(COLLECTION, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getURL: (file) => `${env.HOST}${COLLECTION}?fileName=${file}`,
};

export default fileApi;
