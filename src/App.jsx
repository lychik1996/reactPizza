import './styles/global.scss';
import Pizza from './components/pizza';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MyLoader from './components/skeleton';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectNavigate, setSelectNavigate] = useState('All');
  const [rightNavigate, setRightNavigate] = useState(true);
  const [sort, setSort] = useState('popularity');
  const navigateRightRef = useRef(null);

  useEffect(() => {
    async function data() {
      await delay(1000);
      await axios
        .get('pizza.json')
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
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navigateRightRef.current &&
        !navigateRightRef.current.contains(event.target)
      ) {
        // Если клик был сделан вне блока navigate_right, закрываем его
        setRightNavigate(true);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Удаляем слушатели событий при размонтировании компонента
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  function sortBy(item) {
    setSort(item);
  }
  
  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div className="header_left">
            <img className="header_left_img" src="title.png" alt="" />
            <div className="header_left_elements">
              <h1 className="header_left_elements_title">React Pizza</h1>
              <p className="header_left_elements_description">
                the most delicious pizza in the universe
              </p>
            </div>
          </div>
          <div className="header_right">
            <p className="header_right_price">1000 grn</p>
            <div className="header_right_string"></div>
            <img className="header_right_basket" src="basket.svg" alt="" />
            <p className="header_right_basket_items">3</p>
          </div>
        </header>
        <main>
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
                ref={navigateRightRef}
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
            <h3 className="main_title">All Pizza</h3>
            <ul className="main_items">
              {isLoading
                ? emptyArray.map((_, index) => <MyLoader key={index} />)
                : pizza
                    .filter((elem) => elem.navigate[selectNavigate])
                    .map((elem) => <Pizza key={elem.id} elem={elem} />)}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
