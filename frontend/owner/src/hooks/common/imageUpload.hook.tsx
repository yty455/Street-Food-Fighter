import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { imgstorage } from '@/firebase/firebasedb';

const useImageUploader = (firebaseAddr: any, setURL: any) => {
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(imgstorage, `${firebaseAddr}/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setURL(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return handleImageUpload;
};

export default useImageUploader;
