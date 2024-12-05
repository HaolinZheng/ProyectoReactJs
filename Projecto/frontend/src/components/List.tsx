import { GlobalItem } from "../config/types";
import Item from "./Item";

function List(items: GlobalItem[]) {

  return (
    <>
      <ul>
        {items.map((item) => (
          <Item item={item}/>
        ))}
      </ul>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default List;