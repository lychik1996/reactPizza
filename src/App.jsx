import './styles/global.scss';
import Pizza from './components/pizza';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MyLoader from './components/skeleton';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BasketPizza from './components/basketPizza';
import { clearSum } from './store/pizza.slise';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const API = 'http://localhost:3001/'
function App() {
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectNavigate, setSelectNavigate] = useState('All');
  const [rightNavigate, setRightNavigate] = useState(true);
  const [sort, setSort] = useState('popularity');
  const [changeBasket, setChangeBasket] = useState(true);//time change
  const sum = useSelector(state=>state.pizza.value);
  const count = useSelector(state=>state.pizza.count);
  const dispatch = useDispatch();
  
  const init = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1, // Присваиваем уникальный ID каждому элементу
    // Другие свойства, которые вам нужны
  }));
  const [basketPizza, setBasketPizza] = useState( init );
  

  useEffect(() => {
    async function data() {
      await delay(1000);
      await axios
        .get(`${API}pizza`)
        .then((res) => setPizza(res.data));
      // await axios
      // .get(`${API}basket`)
      // .then((res)=>setBasketPizza(res.data));
      setIsLoading(false);

    }
    data();
  }, []);
  
   function clearBasket(){
    setChangeBasket(!changeBasket);
    dispatch(clearSum());
   }
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
      sortedPizza.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'by price') {
      sortedPizza.sort((a, b) => a.price[0] - b.price[0]);
      console.log(sortedPizza);
    } else if (sort === 'alphabetically') {
      sortedPizza.sort((a, b) => {
        let c = a.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
        let d = b.name.toLowerCase().replace(/[^a-zA-Z]/g, '');
        return c.localeCompare(d);
      });
    }

    return sortedPizza;
  }

  function MainPage() {
    return (
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
            onMouseLeave={() => setRightNavigate(true)}
          >
            <img
              className={`navigate_right_img${rightNavigate ? '_open' : ''}`}
              src="triangle.svg"
              alt=""
            />
            <p className="navigate_right_sort"> Sort by: </p>
            <div className="navigate_right_sortby">
              {sort}
              <div 
              style={rightNavigate ? { display: 'none' } : {}}>
                <ul
                  className="navigate_right_sort_items"
                  
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
    );
  }

  function BasketPage() {
    return (
      <div className="basket">
        {changeBasket? <div className="basket_notEmpty">
          <div className="basket_header">
            <div className="basket_header_left">
              <img
                className="basket_headre_left_img"
                src="basket-basket.svg"
                alt=""
              />
              <h3 className="basket_headre_left_text">Basket</h3>
            </div>
            <div className="basket_header_right">
              <img
                className="basket_headere_right_img"
                src="basket-clearall.svg"
                alt=""
              />
              <p className="basket_header_right_text" onClick={()=>clearBasket()}>Clear basket</p>
            </div>
          </div>
          <ul className="basket_items">
            {basketPizza.map((pizzaBas)=>(
              <BasketPizza
              key={pizzaBas.id}
              pizzaBas={pizzaBas}/>
            ))}
            
          </ul>
          <div className="basket_quantity">
            <div className="basket_quantity_left">
              <p className="basket_quantity_pizza">Total pizzas: </p>
              <p className="basket_quantity_pizzas"> {count}</p>
            </div>
            <div className="basket_quantity_right">
              <p className="basket_quantity_price">Order price: </p>
              <p className="basket_quantity_summa"> {sum}grn. </p>
            </div>
          </div>
          <div className="basket_navigate">
            <Link to="/">
              <button className="basket_navigate_back">
                &lt; &nbsp; Move back
              </button>{' '}
            </Link>

            <button className="basket_nvaigate_pay"> Pay now</button>
          </div>
        </div>:<div className='basket_empty'>
          <h3 className='basket_empty_top'>Basket is empty</h3>
          <p className='basket_empty_info'>Most likely, you haven't ordered pizza yet. To order pizza, go to the main page.</p>
          <img className='basket_empty_img' src="basket-empty.svg" alt="" />
          <Link to="/"><button className='basket_empty_back'>Move back</button></Link>
        </div>}
        
        
      </div>
    );
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
              <p className="header_right_price">{sum} grn</p>
              <div className="header_right_string"></div>
              <img className="header_right_basket" src="basket.svg" alt="" />
              <p className="header_right_basket_items">{count===0? undefined: count}</p>
            </div>
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/basket" element={<BasketPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
