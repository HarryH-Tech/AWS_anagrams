import React, { useState, useEffect } from "react";
import axios from "axios";

function CityInput(props) {
  console.log(process.env.REACT_APP_AWS_API);

  const [name, setName] = useState(null);
  const [anagram, setAnagram] = useState(null);

  const [appDetails, setAppDetails] = useState({
    showName: false,
    loading: false,
    error: false,
  });

  const { showName, loading, error } = appDetails;

  const fetchData = () => {
    axios
      .post(process.env.REACT_APP_AWS_API, { search_string: anagram })
      //  .then((res) => console.log(res.data));
      .then((response) => setName(response.data.name))
      .catch((err) => console.log(err));
    setAppDetails({ showName: true });
  };

  const handleDropdownChange = (e) => {
    setAppDetails({ showName: false });
    setAnagram(e.target.value);

    console.log(name);
  };

  return (
    <div>
      <select onChange={handleDropdownChange}>
        <option>beszofejf</option>
        <option>dosreyckaj</option>
        <option>mkuselno</option>
        <option>pegaerryl</option>
        <option>seevtoobjs</option>
      </select>

      <button onClick={fetchData}>View Name</button>
      {showName && (
        <p>
          {anagram} is an anagram of {name}.
        </p>
      )}
    </div>
  );
}

export default CityInput;
