import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DISPLAY_SEARCH } from "../../redux/actions";

function Search() {
  const [search, setsearch] = useState([]);
  const [input, setinput] = useState([]);
  const [error, setError] = useState(false);
  const history = useNavigate();
  const searchRedux = useSelector((state) => state.search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:4000/products");
        setsearch(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  let menuRef = useRef();
  const dispatch = useDispatch();

  let handler = () => {
    if (searchRedux && !menuRef.current?.contains(!searchRedux)) {
      dispatch(DISPLAY_SEARCH(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handler);
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    if (text.length > 0) {
      const items = search.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        );
      });
      if (items.length > 0) {
        setinput(items);
        setError(false);
        dispatch(DISPLAY_SEARCH(true));
      } else {
        setinput([]);
        setError(true);
      }
    } else if (text === "") {
      setinput([]);
      setError(false);
    }
  };

  const handleProductClick = (id) => {
    history(`/productdetail/${id}`);
    dispatch(DISPLAY_SEARCH(false));
  };

  return (
    <div className="search" ref={menuRef}>
      <input className="search-input" type="text" onChange={handleSearch} />
      {input && searchRedux
        ? input.map((item, key) => (
            <div
              className="search-content"
              key={key}
              onClick={() => handleProductClick(item.id)}
            >
              <div className="search-content-img">
                <img height="40px" width="50px" src={item.image} />
              </div>
              <div className="search-content-contents">
                <div>{item.category}</div>
                <div>{item.name}</div>
              </div>
            </div>
          ))
        : null}
      {error ? <div>search results not found</div> : null}
    </div>
  );
}

export default Search;
