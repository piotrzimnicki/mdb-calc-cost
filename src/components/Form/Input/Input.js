import React from "react";

export const Input = ({name, inputHandler, formData, labelText, type}) => {
    return <label> {labelText}
        <input value={formData[name]} onChange={inputHandler} type={type} name={name}/>
    </label>
}