import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import GMap from "../g-map";
import History from "../history";
import { searchHistoryAction } from "../store/action";
const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
function Autocomplete() {
  const [suggestions, setSuggessions] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [selectLocation, setSelectLocation] = useState({
    lat: "",
    lng: "",
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onInputChange = (e) => {
    setInputVal(e.target.value);
    verify(() => {
      let suggestion = new window.google.maps.places.AutocompleteService();
      suggestion.getPlacePredictions(
        { input: e.target.value },
        (predictions) => {
          setSuggessions(predictions);
        }
      );
    });
  };

  //Implement the debounce functionality to prevent api call for every letter
  const verify = useCallback(
    debounce((data) => {
      data();
    }, 200),
    []
  );

  const handleSelect = async (val) => {
    const autocomplete = new window.google.maps.Geocoder();
    await autocomplete.geocode({ address: val }, (results) => {
      setSelectLocation({
        lat: results?.[0]?.geometry?.location?.lat(),
        lng: results?.[0]?.geometry?.location?.lng(),
      });
    });
    dispatch(searchHistoryAction(val));
    setInputVal(val);
    await setSuggessions([]);
  };
  return (
    <div>
      <div className="autocomplete">
        <label>Autocomplete Search</label>
        <input type="text" onChange={onInputChange} value={inputVal} />
        <div className="autocomplete-items">
          {suggestions?.map((itm, index) => (
            <div key={index} onClick={() => handleSelect(itm?.description)}>
              {itm?.description}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        align="right"
        className="search-his-btn"
        onClick={() => {
          setOpen(true);
        }}
      >
        View Seached History
      </button>
      <GMap
        lat={selectLocation?.lat ? selectLocation?.lat : 23.0225}
        lng={selectLocation?.lng ? selectLocation?.lng : 72.5714}
      />
      {open && <History open={open} setOpen={setOpen} />}
    </div>
  );
}

export default Autocomplete;
