import React, {useState} from "react";
import {SingleItem} from "./SingleItem/SingleItem";
import './Table.css';
import {SummaryTable} from "./Summary/SummaryTable";
export const Table = props => {
    const {data,setData, formData, cat, setCat,setMessage, filterCat, setFilterCat, filteredData, setFilteredData, userCat} = props;
    const [sortDown, setSortDown] = useState(false);
    const dataPairs = {
        Nazwa: 'name',
        Opis: 'description',
        Kategoria: 'cat',
        Cena: 'price'
    }
    const filterCatHandler = e => {
        setFilterCat(e.target.value);
        if(e.target.value === 'wszystko') {
            setFilteredData([...data]);
            return;
        }
        setFilteredData(data.filter(el => el.cat === e.target.value))
    }
    const sortHandle = e => {
        const name = dataPairs[e.target.innerText.replace(' ⇅','')];
        setSortDown(() => !sortDown);
        setFilteredData(filteredData.sort((a,b) => {
            if(sortDown) {
                if(name === 'price') {
                    return (Number(a[name]) - Number(b[name]));
                } else {
                    return (a[name].localeCompare(b[name]));
                }
            }
            if(!sortDown) {
                if(name === 'price') {
                    return (Number(b[name]) - Number(a[name]));
                } else {
                    return (b[name].localeCompare(a[name]));
                }
            }
        }))
    }
    function sumCounter (data) {
        let sum = 0;
        data.map(el => sum += Number(el.price));
        return sum;
    }
    function showHideSummary() {
        const target = document.querySelector('.summary-wrapper');
        const arrow = document.querySelector('.accordion-arrow')
        target.classList.toggle('active');
        arrow.classList.toggle('active');
        if(target.classList.contains('active')) {
            target.style.height = target.scrollHeight + 10 + 'px';
        } else {
            target.style.height = 0;
        }
    }
    return (
        <>
            <div className="main-table">
                <table>
                    <thead>
                    <tr>
                        <th>Lp.</th>
                        <th onClick={sortHandle}>Nazwa ⇅</th>
                        <th onClick={sortHandle}>Opis ⇅</th>
                        <th onClick={sortHandle}>Kategoria ⇅</th>
                        <th onClick={sortHandle}>Cena ⇅</th>
                        <th>Usuń</th>
                        <th>Edytuj</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((el,i) => {
                        return (
                            <SingleItem
                                setMessage={setMessage}
                                formData={formData}
                                cat={cat}
                                setCat={setCat}
                                setData={setData}
                                data={data}
                                index={i}
                                dataSingle={el}
                                key={el.id}
                            />
                        )
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Suma:</th>
                        <th>Ilość:</th>
                        <th>Filtruj</th>
                    </tr>
                    <tr>
                        <td>{sumCounter(data)} zł</td>
                        <td>{data.length}</td>
                        <td>
                            <select value={filterCat} name="cat" onChange={filterCatHandler}>
                                <option key="wszystko" value="wszystko">wszystko</option>
                                {userCat.map(el => {
                                    return <option name={el} key={el} value={el}>{el}</option>
                                })}
                            </select>
                        </td>

                    </tr>
                    </tfoot>
                </table>
            </div>
            <SummaryTable cat={userCat} showHideSummary={showHideSummary} data={data}/>
        </>
    )
}