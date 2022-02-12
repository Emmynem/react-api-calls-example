import React, { useEffect, useState } from "react";

function Covid(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [positiveValue, setPositiveValue] = useState("");
  const [negativeValue, setNegativeValue] = useState("");
  const [recoveredValue, setRecoveredValue] = useState("");
  const [deathValue, setDeathValue] = useState("");

  useEffect(() => {
    setData(props.records);
  }, [props.records, setSearch]);

  const handleSearch = (event) => {
    if (event.target.value !== "") {
      setSearch(event.target.value);
      doFilter(event.target.value);
    } else {
      setSearch(event.target.value);
      setData(props.records);
    }
  };

  const doFilter = (state) => {
    let filteredRecords = data.filter((covid) => {
      return covid.state.toLowerCase().indexOf(state) !== -1;
    });
    setData(filteredRecords);
  };

  const removeData = (hash) => {
    const existingId = data.find((covid) => covid.hash === hash);
    if (existingId) {
      setData(data.filter((covid) => covid.hash !== hash));
    }
  };

  const handlePositiveValue = (event) => {
    setPositiveValue(event.target.value);
    switch (event.target.value) {
      case "ASC":
        setData(data.sort((a, b) => (a.positive > b.positive ? 1 : -1)));
        break;
      case "DESC":
        setData(data.sort((a, b) => (b.positive > a.positive ? 1 : -1)));
        break;
      default:
    }
  };

  const handleNegativeValue = (event) => {
    setNegativeValue(event.target.value);
    switch (event.target.value) {
      case "ASC":
        setData(data.sort((a, b) => (a.negative > b.negative ? 1 : -1)));
        break;
      case "DESC":
        setData(data.sort((a, b) => (b.negative > a.negative ? 1 : -1)));
        break;
      default:
    }
  };

  const handleRecoveredValue = (event) => {
    setRecoveredValue(event.target.value);
    switch (event.target.value) {
      case "ASC":
        setData(data.sort((a, b) => (a.recovered > b.recovered ? 1 : -1)));
        break;
      case "DESC":
        setData(data.sort((a, b) => (b.recovered > a.recovered ? 1 : -1)));
        break;
      default:
    }
  };

  const handleDeathValue = (event) => {
    setDeathValue(event.target.value);
    switch (event.target.value) {
      case "ASC":
        setData(data.sort((a, b) => (a.death > b.death ? 1 : -1)));
        break;
      case "DESC":
        setData(data.sort((a, b) => (b.death > a.death ? 1 : -1)));
        break;
      default:
    }
  };

  // my custom date filter
  const filterDate = (date_string) => {
    let newDate = new Date(date_string);
    var dateFormat =
      newDate.getDate() +
      "/" +
      newDate.getMonth() +
      "/" +
      newDate.getFullYear() +
      "";
    var timeFormat =
      (newDate.getHours() >= 10
        ? newDate.getHours()
        : "0" + newDate.getHours()) +
      ":" +
      (newDate.getMinutes() === 0
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes()) +
      "";
    var fullDate = dateFormat + " @ " + timeFormat;
    return fullDate;
  };

  return (
    <div className="container">
      <h1 className="display-5">Covid records</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search by states"
          className="form-control mb-3"
          value={search}
          onChange={handleSearch}
          aria-label="Text input with dropdown button"
        />
      </div>
      <p>Filter by </p>
      <div className="row">
        <div className="mb-3 col-xl-3 col-md-6 col-sm-12">
          <label className="form-label">Positive</label>
          <select
            value={positiveValue}
            onChange={handlePositiveValue}
            className="form-select"
          >
            <option defaultValue>Select filter</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <div className="mb-3 col-xl-3 col-md-6 col-sm-12">
          <label className="form-label">Negative</label>
          <select
            value={negativeValue}
            onChange={handleNegativeValue}
            className="form-select"
          >
            <option defaultValue>Select Filter</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <div className="mb-3 col-xl-3 col-md-6 col-sm-12">
          <label className="form-label">Recovered</label>
          <select
            value={recoveredValue}
            onChange={handleRecoveredValue}
            className="form-select"
          >
            <option defaultValue>Select filter</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
        <div className="mb-3 col-xl-3 col-md-6 col-sm-12">
          <label className="form-label">Deaths</label>
          <select
            value={deathValue}
            onChange={handleDeathValue}
            className="form-select"
          >
            <option defaultValue>Select filter</option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">State</th>
                <th scope="col">Positive</th>
                <th scope="col">Negative</th>
                <th scope="col">Probable Cases</th>
                <th scope="col">Pending</th>
                <th scope="col">Recovered</th>
                <th scope="col">Death</th>
                <th scope="col">Death Confirmed</th>
                <th scope="col">Total</th>
                <th scope="col">Date Checked</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{record.state}</td>
                    <td>
                      {record.positive == null ? "None" : record.positive}
                    </td>
                    <td>
                      {record.negative == null ? "None" : record.negative}
                    </td>
                    <td>
                      {record.probableCases == null
                        ? "None"
                        : record.probableCases}
                    </td>
                    <td>{record.pending == null ? "None" : record.pending}</td>
                    <td>
                      {record.recovered == null ? "None" : record.recovered}
                    </td>
                    <td>{record.death == null ? "None" : record.death}</td>
                    <td>
                      {record.deathConfirmed == null
                        ? "None"
                        : record.deathConfirmed}
                    </td>
                    <td>{record.total == null ? "None" : record.total}</td>
                    <td>{filterDate(record.dateChecked)}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeData(record.hash)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Covid;
