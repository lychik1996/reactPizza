import { useState } from "react"


export default function Pizza({elem,}){
  const[addbasket, setAddbasket]=useState(0);
  const [thinChange, setThinChange] = useState(true);
  const [sizeChange,setSizeChange] = useState([true, false,false]);

  function changeThin(){
    setThinChange(!thinChange)
  }

  function changeSize(index){
    const updateState = [false,false,false];
    updateState[index] = true;
    setSizeChange(updateState);
  }

  function addInbasket(){
    setAddbasket(addbasket+1);
  }
    return(
        <li className="main_item" id={elem.id}>
          <img className="main_item_img" src={elem.src} alt="" />
          <h2 className="main_item_name">{elem.name}</h2>
          <div className="main_item_changes">
            <div className="main_item_doughs">
              <p className={`main_item_dough ${thinChange? "dough": ""}`} onClick={()=>changeThin()}>Thin</p>
              <p className={`main_item_dough ${!thinChange? "dough":""}`} onClick={()=>changeThin()}>Traditional</p>
            </div>
            <div className="main_item_sizes">
              <p className={`main_item_size ${sizeChange[0] ? "size": ""}`} onClick={()=>changeSize(0)}>26 cm.</p>
              <p className={`main_item_size ${sizeChange[1] ? "size": ""}`} onClick={()=>changeSize(1)}>30 cm.</p>
              <p className={`main_item_size ${sizeChange[2] ? "size": ""}`} onClick={()=>changeSize(2)}>40 cm.</p>
            </div>
          </div>
          <div className="main_item_bot">
            <p className="main_item_bot_price">from 200 grn.</p>
            <div className="main_item_bot_btn" onClick={()=>addInbasket()}>
              <p className="main_item_bot_btn_plus">+</p>
              <p className="main_item_bot_btn_text"> Add</p>
              {addbasket !== 0 && <div className="main_item_bot_quantity">{addbasket}</div>}
              
            </div>
          </div>
        </li>
    )
}