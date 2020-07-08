import React, { useState } from "react";
import axios from "axios";

import { useSpring, animated } from "react-spring";

import "../assets/options_container.scss";

import LoadingSpinner from "../assets/images/LoadingSpinner.gif";

function OptionsContainer() {
  const [name, setName] = useState(null);
  const [anagram, setAnagram] = useState(null);

  const [appDetails, setAppDetails] = useState({
    showName: false,
    loading: false,
    error: false,
  });

  const { showName, loading, error } = appDetails;

  const styleProps = useSpring({
    loop: true,
    config: { duration: 750 },
    from: { opacity: 0 },
    to: { opacity: name ? 1 : 0 },
  });

  const fetchData = () => {
    if (anagram) {
      setAppDetails({ loading: true });
      axios
        .post(process.env.REACT_APP_AWS_API, { search_string: anagram })
        //  .then((res) => console.log(res.data));
        .then((response) => {
          setAppDetails({ showName: true, loading: false });
          setName(response.data.name);
        })
        .catch((err) => {
          setAppDetails({
            ...appDetails,
            loading: false,
            error: "Sorry, there was a problem, please try again.",
          });
        });
    } else if (!anagram) {
      setAppDetails({
        error:
          "Please click on one of the anagrams before pressing the button.",
      });
    }
  };

  const handleDropdownChange = (e) => {
    setName("");
    setAppDetails({ ...appDetails, showName: false });
    setAnagram(e.target.value);
  };

  return (
    <div id="container">
      <h4>
        Try and guess the name of the entrepreneur from the anagrams below.
        <br />
        <br />
        Click on an option and then click the View Name button to see the
        entrepreneur.
      </h4>
      <select
        defaultValue="default"
        id="dropdown"
        onChange={handleDropdownChange}
      >
        <option value="default" disabled>
          Pick an Option
        </option>

        <option>beszofejf</option>
        <option>dosreyckaj</option>
        <option>mkuselno</option>
        <option>pegaarryl</option>
        <option>seevtobjs</option>
      </select>

      <button onClick={fetchData}>View Name</button>
      {showName && anagram && (
        <animated.div id="result-text" style={styleProps}>
          {anagram} is an anagram of <strong>{name}</strong>.
        </animated.div>
      )}
      <br />
      {loading && (
        <img id="loading_spinner" src={LoadingSpinner} alt="Loading..." />
      )}

      {error && <div id="error">{error}</div>}
    </div>
  );
}

export default OptionsContainer;
