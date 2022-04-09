
export function validator (formData, setMessage) {
    const valid = Object.values(formData).map(el => { if(el === '' || Number(el) <= 0) return false});
    if(valid.includes(false)) {
        setMessage({isMessage: true, text: 'Wypełnij wszystkie pola, cena musi być większa od 0'})
        return false;
    } else {
        setMessage({isMessage: false})
        return true;
    }
}