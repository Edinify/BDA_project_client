import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/Icon.svg";

const Loading = ({ mode }) => {
  const [openLoading, setOpenLoading] = useState(true);
  return (
    <>
      {mode === "in-button" ? (
        <div className="in-button">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        openLoading && (
          <div className="loading-main-container">
            <button onClick={() => setOpenLoading(false)} className="close-btn">
              <CloseIcon />
            </button>
            <div className="loading-content">
              <div className="loading-con">
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <p>Yüklənir...</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Loading;
