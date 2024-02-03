import { useState } from 'react';
import PhotoCarausel from 'src/libraries/Gallery/PhotoCarausel';
import PhotoList from 'src/libraries/list/PhotoList';
const PhotoGallery = ({ photoList }) => {
  // const photoList = [
  //     { Id: 1, Name: "Image1", Value: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },
  //     { Id: 2, Name: "Image2", Value: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" },
  //     { Id: 3, Name: "Image3", Value: "https://image.shutterstock.com/mosaic_250/2780032/1194497251/stock-photo-portrait-of-smiling-red-haired-millennial-man-looking-at-camera-sitting-in-caf-or-coffeeshop-1194497251.jpg" },
  //     { Id: 4, Name: "Image4", Value: "https://i2-prod.dailyrecord.co.uk/incoming/article26949550.ece/ALTERNATES/s615/280736056_5215739155160579_2994299419128774691_n.jpg" }
  // ]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPhotoCard, setshowPhotoCard] = useState(false);
  const clickPhoto = (value) => {
    setshowPhotoCard(true);
    setCurrentIndex(value);
  };
  const clickClose = () => {
    setshowPhotoCard(false);
  };
  const clickPhotoIndex = (value) => {
    setCurrentIndex(value);
  };
  return (
    <>
      {showPhotoCard ? (
        <PhotoCarausel
          item={photoList[currentIndex]}
          maxLength={photoList.length - 1}
          index={currentIndex}
          clickClose={clickClose}
          clickPhotoIndex={clickPhotoIndex}
        ></PhotoCarausel>
      ) : (
        <PhotoList PhotoList={photoList} clickPhoto={clickPhoto}></PhotoList>
      )}
    </>
  );
};

export default PhotoGallery;
