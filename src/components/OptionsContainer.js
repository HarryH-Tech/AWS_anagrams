import React, { useState } from "react";
import axios from "axios";

import { useSpring, animated } from "react-spring";

import "../assets/options_container.scss";

function OptionsContainer() {
  const [anagram, setAnagram] = useState(null);

  const [entrepreneurDetails, setEntrepreneurDetails] = useState({
    name: "",
    description: "",
  });

  const [appDetails, setAppDetails] = useState({
    showName: false,
    loading: false,
    error: false,
  });

  const { showName, loading, error } = appDetails;
  const { name, description } = entrepreneurDetails;

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
          setEntrepreneurDetails({
            name: response.data.name,
            description: response.data.description,
          });
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
    setEntrepreneurDetails({ name: "" });
    setAppDetails({ ...appDetails, showName: false });
    setAnagram(e.target.value);
  };

  const formatDescription = (descriptionString) => {
    let splitString = descriptionString.split(" ");
    if (descriptionString) {
      //If only 1 item in array return array
      if (splitString.length === 1) {
        return descriptionString;
      }

      if (splitString.length === 2) {
        return splitString.map((ds, index) => {
          return index + 1 > splitString.length - 1 ? " and " + ds : ds;
        });
      }

      if (splitString.length > 2) {
        return splitString.map((ds, index) => {
          return index + 1 > splitString.length - 1 ? " and " + ds : ds + ", ";
        });
      }
    }
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
        <option>ichmchlleezlynta</option>
        <option>mkuselno</option>
        <option>pegaarryl</option>
        <option>nneajcickiwo</option>
        <option>seevtobjs</option>
        <option>evangelspie</option>
        <option>nnieaaot</option>
        <option>lltegibas</option>
      </select>

      <button onClick={fetchData}>View Name</button>
      {showName && anagram && description && (
        <animated.div id="result-text" style={styleProps}>
          {anagram} is an anagram of <strong>{name}</strong>. {name} founded{" "}
          {formatDescription(description)}.
        </animated.div>
      )}
      <br />
      {loading && (
        <img
          id="loading_spinner"
          src={
            "https://thumbs.gfycat.com/OrderlyHeartyAsiaticlesserfreshwaterclam-small.gif"
          }
          alt="Loading..."
        />
      )}
      <br />
      {error && <div id="error">{error}</div>}
    </div>
  );
}

export default OptionsContainer;
