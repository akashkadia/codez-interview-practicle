import React from "react";
import "../assests/css/modal.css";
import { useSelector } from "react-redux";
function History({ open, setOpen }) {
  const searchHistory = useSelector((state) => state?.common?.history);
  return (
    open && (
      <div className="main">
        <div className="style-modal">
          <div className="inner-div">
            {searchHistory?.length > 0 ? (
              searchHistory?.map((itm, index) => (
                <div key={index}>
                  {itm} <hr />
                </div>
              ))
            ) : (
              <div>No Result Found</div>
            )}
          </div>
          <button
            className="close-btn"
            type="button"
            onClick={() => setOpen(false)}
          >
            X
          </button>
        </div>
      </div>
    )
  );
}

export default History;
