import React, { useEffect, useState } from "react";

function Cats(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const myImage = {
    objectFit: "cover",
    height: "200"
  };

  useEffect(() => {
    setData(props.cats);
  }, [props.cats, setSearch]);

  const handleSearch = (event) => {
    if (event.target.value !== "") {
      setSearch(event.target.value);
      doFilter(event.target.value);
    } else {
      setSearch(event.target.value);
      setData(props.cats);
    }
  };

  const doFilter = (id) => {
    let filteredCats = data.filter((cat) => {
      return cat.id.toLowerCase().indexOf(id) !== -1;
    });
    setData(filteredCats);
  };

  const removeCat = (id) => {
    const existingId = data.find((cat) => cat.id === id);
    if (existingId) {
      setData(data.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="container">
      <h1 className="display-5">Cats</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search for cat ID's"
          className="form-control mb-3"
          value={search}
          onChange={handleSearch}
          aria-label="Text input with dropdown button"
        />
      </div>
      <div className="row">
        {data.map((cat, index) => {
          return (
            <div className="col-xl-4 col-md-6 col-sm-12 mb-3" key={index}>
              <div className="card">
                <img
                  style={myImage}
                  src={cat.url}
                  className="card-img-top"
                  alt={cat.id}
                />
                <div className="card-body">
                  <h5 className="card-title">ID : {cat.id}</h5>
                  <p>
                    Width : {cat.width} | Height : {cat.height}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeCat(cat.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cats;
