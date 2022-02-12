import React, { useState, useEffect } from "react";
import user from "../APIs/user";
import cats from "../APIs/cats";
import countries from "../APIs/countries";
import covid from "../APIs/covid";
import spaceX from "../APIs/spaceX";
import Cats from "./cats";
import Covid from "./covid";
import { Tab } from "bootstrap";

function MainFunctional() {
  const [data, setData] = useState([]);
  const [allcats, setAllCats] = useState([]);
  const [allcovids, setCovids] = useState([]);

  useEffect(() => {
    user.getRandomUserNames().then((response) => {
      setData(response.data.results);
    });
    // spaceX.latest().then((response) => {
    //   console.log("got spaceX", response.data);
    // });
    cats.get100Cats().then((response) => {
      setAllCats(response.data);
    });
    // countries.getCountries().then((response) => {
    //   console.log("got countries", response);
    // });
    covid.getCurrentCovidStats().then((response) => {
      setCovids(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-3">Api's</h1>
            <hr />
          </div>
        </div>
      </div>
      <Cats cats={allcats} />
      {/* <Covid records={allcovids} /> */}

      {/* {data.map((item, index) => {
        return <div key={index}>name: {item.name.first}</div>;
      })} */}
    </div>
  );
}

export default MainFunctional;
