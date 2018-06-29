import { ImageManipulator } from 'expo';
import ImageResult = ImageManipulator.ImageResult;

export const SELECT_IMAGES = 'SELECT_IMAGES';

export const selectImages = (images: ImageResult[]) => {
  return {
    type: SELECT_IMAGES,
    images
  };
};
