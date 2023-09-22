import './styles/global.scss';
import Pizza from './components/pizza';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MyLoader from './components/skeleton';
import { Route,Routes, BrowserRouter, Link } from 'react-router-dom';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectNavigate, setSelectNavigate] = useState('All');
  const [rightNavigate, setRightNavigate] = useState(true);
  const [sort, setSort] = useState('popularity');
  
  const [basketItem, setBasketItem] = useState([]);

  useEffect(() => {
    async function data() {
      await delay(1000);
      await axios
        .get('http://localhost:3001/pizza/')
        .then((res) => setPizza(res.data));
      setIsLoading(false);
    }
    data();
  }, []);

  const emptyArray = new Array(6).fill(null); //array for skeleton

  const items = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy', 'Close']; //array for navigate

  function clickNavigate(item) {
    setSelectNavigate(item);
  }

  function closeRightNav() {
    //open-close right navigate
    setRightNavigate(!rightNavigate);
  }

  //add click in right navigate
  

  function sortBy(item) {
    setSort(item);
  }
  
  function sortItem() {
    let sortedPizza = [...pizza];

    if (sort === 'popularity') {
      sortedPizza.sort((a, b)=>b.rating - a.rating);
    } else if (sort === 'by price') {
      sortedPizza.sort((a,b)=>a.price[0]-b.price[0]);
      console.log(sortedPizza);
    } else if (sort === 'alphabetically') {
      sortedPizza.sort((a, b)=>{
        let c = a.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
        let d = b.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
        return c.localeCompare(d);
      });
    }

    return sortedPizza;
  }


   function MainPage(){
    
    return(
      <div className="main">
      <div className="navigate">
        <ul className="navigate_left">
          {items.map((item) => (
            <li
              key={item}
              className={`navigate_left_item ${
                selectNavigate === item ? 'chose' : ''
              }`}
              onClick={() => clickNavigate(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div
          className="navigate_right"
          onClick={() => closeRightNav()}
          onMouseLeave={()=>setRightNavigate(true)}
        >
          <img
            className={`navigate_right_img${
              rightNavigate ? '_open' : ''
            }`}
            src="triangle.svg"
            alt=""
          />
          <p className="navigate_right_sort"> Sort by: </p>
          <div className="navigate_right_sortby">
            {sort}
            <div>
              <ul
                className="navigate_right_sort_items"
                style={rightNavigate ? { display: 'none' } : {}}
              >
                <li
                  className={`navigate_right_sort_item ${
                    sort === 'popularity' ? 'focus' : ''
                  }`}
                  onClick={() => sortBy('popularity')}
                >
                  popularity
                </li>
                <li
                  className={`navigate_right_sort_item ${
                    sort === 'by price' ? 'focus' : ''
                  }`}
                  onClick={() => sortBy('by price')}
                >
                  {' '}
                  by price
                </li>
                <li
                  className={`navigate_right_sort_item ${
                    sort === 'alphabetically' ? 'focus' : ''
                  }`}
                  onClick={() => sortBy('alphabetically')}
                >
                  alphabetically
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
      <h3 className="main_title">All Pizza</h3>
      <ul className="main_items">
        {isLoading
          ? emptyArray.map((_, index) => <MyLoader key={index} />)
          : sortItem()
              .filter((elem) => elem.navigate[selectNavigate])
              .map((elem) => <Pizza key={elem.id} elem={elem} />)}
      </ul>
    </div>
    )
  }
  
  function BasketPage(){
    return (
      <div className='basket'>
        <div className='basket_notEmpty'>
          <div className='basket_header'>
            <div className='basket_header_left'>
              <img className='basket_headre_left_img' src="basket-basket.svg" alt="" />
              <h3 className='basket_headre_left_text'>Basket</h3>
            </div>
            <div className='basket_header_right'>
              <img className='basket_headere_right_img' src="basket-clearall.svg" alt="" />
              <p className='basket_header_right_text'>Clear basket</p>
            </div>
          </div>
          <ul className='basket_items'>
              <li className='basket_item'>
                  <img className='basket_item_img' src="./pizza/pizza1.png" alt="" />
                  <div className='basket_item_info'>
                    <p className='basket_item_info_top'>Cheese</p>
                    <p className='basket_item_info_bot'>Thin dought, 26 cm.</p>
                  </div>
                  <div className='basket_item_change'>
                    <div>
                      <img className='basket_item_change_img' src="basket-minus.svg" alt="" />
                    </div>
                    <span className='basket_item_quantity'>2</span>
                    <div>
                      <img className='basket_item_change_img' src="basket-plus.svg" alt="" />
                    </div>
                  </div>
                  <span className='basket_item_price'>440 grn.</span>
                  <div className='change_clear'>
                    <img className='basket_item_clear' src="basket-clear.svg" alt="" />
                  </div>
              </li>
              <li className='basket_item'>
                  <img className='basket_item_img' src="./pizza/pizza1.png" alt="" />
                  <div className='basket_item_info'>
                    <p className='basket_item_info_top'>Cheese</p>
                    <p className='basket_item_info_bot'>Thin dought, 26 cm.</p>
                  </div>
                  <div className='basket_item_change'>
                    <div>
                      <img className='basket_item_change_img' src="basket-minus.svg" alt="" />
                    </div>
                    <span className='basket_item_quantity'>2</span>
                    <div>
                      <img className='basket_item_change_img' src="basket-plus.svg" alt="" />
                    </div>
                  </div>
                  <span className='basket_item_price'>440 grn.</span>
                  <div className='change_clear'>
                    <img className='basket_item_clear' src="basket-clear.svg" alt="" />
                  </div>
              </li>
          </ul>
          <div className='basket_quantity'>
            <div className='basket_quantity_left'>
              <p className='basket_quantity_pizza'>Total pizzas: </p>
              <p className='basket_quantity_pizzas'> 2 </p>
            </div>
            <div className='basket_quantity_right'>
              <p className='basket_quantity_price'>Order price: </p>
              <p className='basket_quantity_summa'> 440grn. </p>
            </div>
          </div>
          <div className='basket_navigate'>
            <Link to='/'><button className='basket_navigate_back'>&lt; &nbsp; Move back</button> </Link>
            
            <button className='basket_nvaigate_pay'> Pay now</button>
          </div>
        </div>
        {/* <div className='basket_empty'>
          <h3 className='basket_empty_top'>Basket is empty</h3>
          <p className='basket_empty_info'>Most likely, you haven't ordered pizza yet. To order pizza, go to the main page.</p>
          <img className='basket_empty_img' src="basket-empty.svg" alt="" />
          <Link to="/"><button className='basket_empty_back'>Move back</button></Link>
        </div> */}
      </div>
    )
  }
  return (
    <BrowserRouter>
      <div className="wrapper">
        <header className="header">
          <Link to="/">
            <div className="header_left">
              <img className="header_left_img" src="title.png" alt="" />
              <div className="header_left_elements">
                <h1 className="header_left_elements_title">React Pizza</h1>
                <p className="header_left_elements_description">
                  the most delicious pizza in the universe
                </p>
              </div>
            </div>
          </Link>
          <Link to="/basket">
            <div className="header_right">
              <p className="header_right_price">1000 grn</p>
              <div className="header_right_string"></div>
              <img className="header_right_basket" src="basket.svg" alt="" />
              <p className="header_right_basket_items">3</p>
            </div>
          </Link>
          
        </header>
        <main>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/basket' element={<BasketPage/>}/>
          </Routes>
        </main>
      </div>
      </BrowserRouter>
  );
}

export default App;
