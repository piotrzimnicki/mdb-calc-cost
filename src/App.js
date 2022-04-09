import './App.css';
import {Form} from "./components/Form/Form";
import {useEffect, useState} from "react";
import {Table} from "./components/Table/Table";

export function App() {
    const formDefault = {
        cat: 'podzespoły komputera',
        name: '',
        description: '',
        price: 0
    }
    const [data, setData] = useState([]);
    const [cat, setCat] = useState(['podzespoły komputera', 'urządzenia peryferyjne', 'oprogramowanie', 'inne']);
    const [userCat,setUserCat] = useState([])
    const [formData, setFormData] = useState(formDefault);
    const [message, setMessage] = useState({})
    const [filterCat, setFilterCat] = useState('wszystko');
    const [filteredData, setFilteredData] = useState([])

    const filterCatHandle = () => {
        if(!userCat.includes(filterCat)) return setFilteredData(data);
        setFilteredData(data.filter(el => el.cat === filterCat))
    }
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('mdb-calc-data')) && JSON.parse(localStorage.getItem('mdb-calc-data')).length > 0) {
            setData(JSON.parse(localStorage.getItem('mdb-calc-data')))
        }
        setFilteredData(JSON.parse(localStorage.getItem('mdb-calc-data')))
        if(JSON.parse(localStorage.getItem('mdb-calc-cat')) && JSON.parse(localStorage.getItem('mdb-calc-cat')).length > 0) {
            setUserCat( JSON.parse(localStorage.getItem('mdb-calc-cat')));
        } else {
            setUserCat( cat );
        }

    },[])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('mdb-calc-data', JSON.stringify(data));
            localStorage.setItem('mdb-calc-cat', JSON.stringify(userCat));
        },10)
        filterCatHandle();
    },[data,userCat])


    return (
        <div className="wrapper">
            <Form
                message={message}
                setMessage={setMessage}
                formData={formData}
                setFormData={setFormData}
                cat={cat}
                setCat={setCat}
                data={data}
                setData={setData}
                formDefault={formDefault}
                userCat={userCat}
                setUserCat={setUserCat}
            />

                <Table
                    formData={formData}
                    cat={cat}
                    setCat={setCat}
                    setData={setData}
                    data={data}
                    setMessage={setMessage}
                    filterCat={filterCat}
                    setFilterCat={setFilterCat}
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                    userCat={userCat}
                />
        </div>
    );
}
