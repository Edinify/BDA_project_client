import React from "react";

export default function Status({ data, setInputValue, formik, addGroupData }) {
  const changeSector = (e, value) => {
    addGroupData("status", value);
    setInputValue("status", true);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <label className="radio-sector-title"></label>
      <div className="radio-sector-con department">
        <label>
          <input
            type="radio"
            name="status"
            checked={data?.status ? true : false}
            onChange={(e) => changeSector(e, true)}
          />
          Məzun
        </label>

        <label>
          <input
            type="radio"
            name="language"
            checked={!data?.status ? true : false}
            onChange={(e) => changeSector(e, false)}
          />
          Davam edir
        </label>
      </div>
      {formik.errors.sector && (
        <small className="validation-err-message sector">
          {formik.errors.status}
        </small>
      )}
    </div>
  );
}
