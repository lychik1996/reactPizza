export default function BasketPizza({pizzaBas}){
    return(
        <>
        <li className="basket_item">
              <img
                className="basket_item_img"
                src="./pizza/pizza1.png"
                alt=""
              />
              <div className="basket_item_info">
                <p className="basket_item_info_top">Cheese</p>
                <p className="basket_item_info_bot">Thin dought, 26 cm.</p>
              </div>
              <div className="basket_item_change">
                <div>
                  <img
                    className="basket_item_change_img"
                    src="basket-minus.svg"
                    alt=""
                  />
                </div>
                <span className="basket_item_quantity">2</span>
                <div>
                  <img
                    className="basket_item_change_img"
                    src="basket-plus.svg"
                    alt=""
                  />
                </div>
              </div>
              <span className="basket_item_price">440 grn.</span>
              <div className="change_clear">
                <img
                  className="basket_item_clear"
                  src="basket-clear.svg"
                  alt=""
                />
              </div>
            </li>
        </>
    )
}