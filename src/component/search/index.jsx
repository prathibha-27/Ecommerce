import { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [search, setsearch] = useState([]);
  const [input, setinput] = useState([]);
  const [display, setDisplay] = useState();
  const [error, setError] = useState(false);

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

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();

    if (text.length > 0) {
      const cars = search.filter((car) => {
        return (
          car.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        );
      });
      if (cars.length > 0) {
        setinput(cars);
        setError(false);
        setDisplay(true);
      } else {
        setinput([]);
        setError(true);
      }
    } else if (text === "") {
      setinput([]);
      setError(false);
    }
  };

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        onFocus={display}
        onBlur={() => setDisplay(false)}
        onChange={handleSearch}
      />
      {input && display
        ? input.map((car, key) => (
            <div className="search-content" key={key}>
              <div className="search-content-img">
                <img height="40px" width="50px" src={car.image} />
              </div>
              <div className="search-content-contents">
                <div>{car.category}</div>
                <div>{car.name}</div>
              </div>
            </div>
          ))
        : null}
      {error ? <div>search results not found</div> : null}
    </div>
  );
}

export default Search;
