import { GlobalItem } from "../config/types";

function Item( item: GlobalItem ) {

  return (
    <>
      <li>
        <div className="display: block justify-between items-center border-2 border-black bg-gray-primary">
          <p></p>
          <p></p>
        </div>
      </li>
    </>
  );
}

export default Item;