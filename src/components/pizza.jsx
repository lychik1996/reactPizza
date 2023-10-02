import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSum } from '../store/pizza.slise';

export default function Pizza({ elem }) {
  const thinAvaible = elem.type.some((item) => item === 0);
  const tradAvaible = elem.type.some((item) => item === 1);
  const sizeSmall = elem.size.some((item) => item === 26);
  const sizeMedium = elem.size.some((item) => item === 30);
  const sizeLarge = elem.size.some((item) => item === 40);
  // const dispatch = useDispatch();
  const [addUpdate, setAddUpdate] = useState(0);
  const [thinChange, setThinChange] = useState([
    thinAvaible && true,
    !thinAvaible && true,
  ]);
  const [sizeChange, setSizeChange] = useState([
    sizeSmall && true,
    !sizeSmall && sizeMedium && true,
    !sizeSmall && !sizeMedium && true,
  ]);
  const [pricePizza, setPricePizza] = useState(0);

  useEffect(() => {
    updatePrice(
      thinChange.findIndex((selected) => selected),
      sizeChange.findIndex((selected) => selected)
    );
  }, []); //add price in load page

  function changeThin(index) {
    const updateState = [false, false];
    updateState[index] = true;
    setThinChange(updateState);

    updatePrice(
      index,
      sizeChange.findIndex((selected) => selected)
    );
  }

  function changeSize(index) {
    const updateState = [false, false, false];
    updateState[index] = true;
    setSizeChange(updateState);

    updatePrice(
      thinChange.findIndex((selected) => selected),
      index
    );
  }

  function addInUpdate() {
    // updateBasket();
    setAddUpdate(addUpdate + 1);
  } //change btn

  function updatePrice(thinIndex, sizeIndex) {
    const priceIndex = thinIndex * 3 + sizeIndex;
    setPricePizza(elem.price[priceIndex]);
  } //update price pizza

  function sumHeader(){
    dispatch(addSum(pricePizza))
  }
  function add(){
    addInUpdate();
    sumHeader();
  }
  return (
    <li className="main_item" id={elem.id}>
      <img className="main_item_img" src={elem.src} alt="" />
      <h2 className="main_item_name">{elem.name}</h2>
      <div className="main_item_changes">
        <div className="main_item_doughs">
          <p
            className={`main_item_dough ${
              thinAvaible ? (thinChange[0] ? 'dough' : '') : 'disable'
            }`}
            onClick={() => thinAvaible && changeThin(0)}
          >
            Thin
          </p>
          <p
            className={`main_item_dough ${
              tradAvaible ? (thinChange[1] ? 'dough' : '') : 'disable'
            }`}
            onClick={() => tradAvaible && changeThin(1)}
          >
            Traditional
          </p>
        </div>
        <div className="main_item_sizes">
          <p
            className={`main_item_size ${
              sizeSmall ? (sizeChange[0] ? 'size' : '') : 'disable'
            }`}
            onClick={() => sizeSmall && changeSize(0)}
          >
            26 cm.
          </p>
          <p
            className={`main_item_size ${
              sizeMedium ? (sizeChange[1] ? 'size' : '') : 'disable'
            }`}
            onClick={() => sizeMedium && changeSize(1)}
          >
            30 cm.
          </p>
          <p
            className={`main_item_size ${
              sizeLarge ? (sizeChange[2] ? 'size' : '') : 'disable'
            }`}
            onClick={() => sizeLarge && changeSize(2)}
          >
            40 cm.
          </p>
        </div>
      </div>
      <div className="main_item_bot">
        <p className="main_item_bot_price">from {pricePizza} grn.</p>
        <div className="main_item_bot_btn" onClick={() => add()}>
          <p className="main_item_bot_btn_plus">+</p>
          <p className="main_item_bot_btn_text"> Add</p>
          {addUpdate !== 0 && (
            <div className="main_item_bot_quantity">{addUpdate}</div>
          )}
        </div>
      </div>
    </li>
  );
}
