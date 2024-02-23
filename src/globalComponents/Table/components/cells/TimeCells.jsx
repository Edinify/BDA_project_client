import React from 'react'

const TimeCells = ({index, first_time, second_time}) => {
  return (
    <td className="time"  key={index}>
        {first_time}
        <br /> - <br /> {second_time}
    </td>
  )
}

export default TimeCells