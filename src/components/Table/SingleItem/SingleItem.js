import React, {useState} from "react";
import {Select} from "../../Form/Select/Select";
import {validator} from "../../../utils/validator";

export const SingleItem = ({dataSingle, index, setData, data, cat, setMessage}) => {
    const [edit, setEdit] = useState(false)
    const removeItem = () => {
        setData(data => (
            data.filter(el => el.id !== dataSingle.id)
        ))
    }
    const editItem = () => {
        const valid = validator(dataSingle,setMessage);
        if(!valid) return;
        setEdit( edit => !edit);
    }

    const inputHandler = e => {
        setData(data.map(el => {
            if(el.id === dataSingle.id) {
                return {...el, [e.target.name]: e.target.value}
            }
            return el
        }))
    }
    const selectHandler = e => {
        setData(data.map(el => {
            if(el.id === dataSingle.id) {
                return {...el, cat: e.target.value}
            }
            return el
        }))
    }
    return (
        <>
            {edit ?
                <tr>
                    <td>{index + 1}</td>
                    <td><input onChange={inputHandler} type="text" name="name" value={dataSingle.name}/></td>
                    <td> {dataSingle.description.length <= 10 ?
                        <input onChange={inputHandler} type="text" name="description" value={dataSingle.description}/>
                        : <textarea onChange={inputHandler} type="text" name="description"
                                 value={dataSingle.description}/>
                    }
                        </td>
                    <td>
                        <select value={dataSingle.cat} name="cat" onChange={selectHandler}>
                        {cat.map(el => {
                            return <option name={el} key={el} value={el}>{el}</option>
                        })}
                        </select>

                    </td>
                    <td><input onChange={inputHandler} type="number" name="price" value={dataSingle.price}/></td>
                    <td>
                        <button onClick={removeItem}>X</button>
                    </td>
                    <td>
                        <button onClick={editItem}>📝</button>
                    </td>
                </tr>
                :
                <tr>
                    <td>{index + 1}</td>
                    <td>{dataSingle.name}</td>
                    <td>{dataSingle.description}</td>
                    <td>{dataSingle.cat}</td>
                    <td>{dataSingle.price} zł</td>
                    <td>
                        <button className="btn-remove" onClick={removeItem}>X</button>
                    </td>
                    <td>
                        <button className="btn-edit" onClick={editItem}>📝</button>
                    </td>
                </tr>}
        </>

    )
}