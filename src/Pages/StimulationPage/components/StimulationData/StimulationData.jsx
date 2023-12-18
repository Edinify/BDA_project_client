import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BonusData from "./BonusPage/BonusData";
import FineData from "./FinePage/FineData";

const StimulationData = ({
  getPageNumberBonus,
  getPageNumberFine,
  finePageNum,
  bonusPageNum,
}) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/stimulations/bonus" ? (
        <BonusData
          bonusPageNum={bonusPageNum}
          getPageNumber={getPageNumberBonus}
        />
      ) : (
        <FineData finePageNum={finePageNum} getPageNumber={getPageNumberFine} />
      )}
    </div>
  );
};

export default StimulationData;
