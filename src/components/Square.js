import React from 'react'

export default function Square(props) {
  return (
    <button className='cell' onClick={props.onClick}>
        <span className={`${ props.value==='X' ? 'xPlayer' : 'oPlayer'}`} >{props.value}</span> 
    </button>
  )
}
