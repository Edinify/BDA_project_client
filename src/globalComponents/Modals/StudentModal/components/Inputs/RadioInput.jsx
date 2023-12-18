import React from 'react'

export default function RadioInput({modalData, setInputValue, formik, updateModalState}) {
  const changeSector = (e, value) => {
        updateModalState("sector", 
        {
          az: value === 'AZ' ? e.target.checked : modalData?.sector?.az !== undefined ? modalData?.sector?.az : false ,
          en: value === 'EN' ? e.target.checked : modalData?.sector?.en !== undefined ? modalData?.sector?.en : false,
          ru: value === 'RU' ? e.target.checked : modalData?.sector?.ru !== undefined ? modalData?.sector?.ru : false,
        } )
      setInputValue("sector", true)
  }

  return (
    <div>      
    <label className="radio-sector-title">Bölmə</label>
    <div className="radio-sector-con department">
        <label>
        <input type="checkbox" name="sector"  
          checked={modalData?.sector?.az !== undefined ? modalData?.sector?.az : false}
          onChange={(e) => changeSector(e, "AZ")}
        />
        AZ
        </label>

        <label>
        <input type="checkbox" name="language" 
          checked={modalData?.sector?.en !== undefined ? modalData?.sector?.en : false}
          onChange={(e) => changeSector(e, "EN")}
        />
        RU
        </label>

        <label>
        <input type="checkbox" name="language" 
          checked={modalData?.sector?.ru !== undefined ? modalData?.sector?.ru : false}
          onChange={(e) => changeSector(e, "RU")}
        />
        EN
        </label>
    </div>
    {formik.errors.sector &&  <small className="validation-err-message sector">{formik.errors.sector}</small>}
    </div>
  )
}
