import TabulerCard from 'src/libraries/ResuableComponents/TabularCard';

function TabulerList({ ItemList, clickEdit, clickDelete }) {
  return (
    <div>
      <>
        {ItemList.map((Item, i) => {
          return (
            <div key={i}>
              <TabulerCard
                item={Item}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
              />
            </div>
          );
        })}
      </>
    </div>
  );
}

export default TabulerList;
