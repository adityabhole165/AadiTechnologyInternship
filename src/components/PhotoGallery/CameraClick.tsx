import { useState } from 'react';

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo
} from '@capacitor/camera';
interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  base64Data: string;
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}
const CameraClick = () => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const savePicture = async (
    photo: Photo,
    fileName: string
  ): Promise<UserPhoto> => {
    const base64Data = await base64FromPath(photo.webPath!);

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      base64Data: base64Data
    };
  };
  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 55
      });
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await savePicture(photo, fileName);

      const newPhotos = [savedFileImage];
      setPhotos(newPhotos);
    } catch (error) {
      console.error('Failed to browse image');
    } finally {
      console.log('Handled');
    }
  };

  return {
    photos,
    takePhoto
  };
};

export default CameraClick;
