import { GlobalItem } from "../config/types";
import Item from "./Item";

function List(items: GlobalItem[]) {

  return (
    <>
      <ul>
        {items.map(item) => (
          <Item item={item}/>
        )}
      </ul>
    </>
  );
}

export default List;