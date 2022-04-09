import React from "react";

export const Select = ({cat, selectHandler, formData,name}) => {


    return <>
        <select name={name} value={formData[name]} onChange={selectHandler}>
            {cat.map(el => {
                return <option name={el} key={el} value={el}>{el}</option>
            })}
        </select>
    </>
}