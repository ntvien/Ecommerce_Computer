import { storage } from "../../firebase";
const firebaseStorageApi = {
    uploadImage: (image, path, callBack) => {
        const ref = storage.ref(`/images/${path}/${image.name}`);
        const uploadTask = ref.put(image);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    callBack(url);
                });
        });
    }
}
export default firebaseStorageApi