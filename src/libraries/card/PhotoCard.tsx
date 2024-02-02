const PhotoCard = ({ item, columns = 1, rows = 1 }) => {
  let minHeight = (window.innerHeight - 350) / rows;
  let maxHeight = (window.innerHeight - 250) / rows;
  let maxWidth = (window.innerWidth - 50) / columns;
  return (
    <>
      {
        <img
          src={item.Value}
          style={{
            padding: '1em 1em 1em 1em',
            minHeight: minHeight,
            maxHeight: maxHeight,
            maxWidth: maxWidth
          }}
        />
      }
    </>
  );
};

export default PhotoCard;
