import React, {useEffect, useState} from "react";
import {Input} from "./Input/Input";
import {Select} from "./Select/Select";
import {v4 as uuid} from 'uuid';
import {validator} from "../../utils/validator";
import './Form.css';
export const Form = props => {
    const [newCat, setNewCat] = useState({isAdding: false, catName: ''});
    const {
        data,
        setData,
        setFormData,
        formData,
        cat,
        setCat,
        formDefault,
        message,
        setMessage,
        userCat,
        setUserCat
    } = props;
    const inputHandler = e => {
        setFormData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }))
    }
    const selectHandler = e => {
        setMessage({isMessage:false});
        setFormData(data => ({
            ...data, cat: e.target.value
        }))
    }
    const sendForm = e => {
        e.preventDefault();
        const valid = validator(formData,setMessage);
        if(!valid) return;

        setData(data => (
            [...data,{...formData, id: uuid()}]
        ))
        setFormData(() => formDefault)
    }
    const setEditCat = e => {
        e.preventDefault();
        setNewCat(data => ({...data, isAdding: !data.isAdding}));
    }
    const addCategoryInputHandler = e => {
        setNewCat(data => {
            return {...data, catName: e.target.value}
        })
    }
    const addCategory = e => {
        e.preventDefault();
        const unique = [];
        userCat.map(el => {if(el === newCat.catName) unique.push(false)})
        if(unique.includes(false)) return setMessage(() => ({isMessage: true, text: 'Już istnieje taka kategoria'}));
        if(newCat.catName.length > 0) {
            setUserCat(data => ([...data,newCat.catName]));
            setNewCat({isAdding: false, catName: ''});
            setMessage({isMessage:false});
            return;
        } else {
            setMessage({isMessage: true, text: 'Podaj nazwę kategorii'})
        }
    }
    const removeCategory = e => {
        e.preventDefault();
        const currentCat = formData.cat;
        const catHasItem = data.filter(el => el.cat === currentCat);
        if(cat.includes(currentCat)) {
            setMessage({isMessage: true, text: 'Domyślnej kategorii nie można usunąć'});
            return;
        } else {
            setMessage({isMessage:false});
        }
        if(catHasItem.length > 0 ) {
            setMessage({isMessage: true, text: 'Usuń przedmioty przypisane do tej kategorii'});
            return;
        } else {
            setMessage({isMessage:false});
        }
        setUserCat(userCat.filter(el => el !== currentCat));
    }
    return (
        <>
            <h2>MDB Kalkulator kosztów</h2>
            <form onSubmit={sendForm}>
                <div className="message-wrapper">
                    {message.isMessage && <p className="message fadeIn">{message.text}</p>}
                </div>
                <Input type="text" labelText="Nazwa:" formData={formData} inputHandler={inputHandler} name="name"/>
                <Input type="text" labelText="Opis:" formData={formData} inputHandler={inputHandler} name="description"/>
                <label>Kategoria:
                    {newCat.isAdding ?
                        <div className="cat-select-wrapper">
                            <input onChange={addCategoryInputHandler} name="new-cat"  type="text"/>
                            <button onClick={addCategory}>+</button>
                            <button onClick={setEditCat}>X</button>
                        </div>
                        :
                        <div className="cat-select-wrapper">
                            <Select name="cat" formData={formData} selectHandler={selectHandler} cat={userCat} setCat={setCat}/>
                            <button onClick={setEditCat}>+</button>
                            <button onClick={removeCategory}>-</button>
                        </div>
                    }
                </label>
                <Input type="number" labelText="Cena:" formData={formData} inputHandler={inputHandler} name="price"/>
                <button className="btn-add">Dodaj</button>
            </form>
        </>

    )
}