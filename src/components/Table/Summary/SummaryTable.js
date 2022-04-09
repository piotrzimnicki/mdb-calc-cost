import React from "react";

export const SummaryTable = ({cat,showHideSummary,data}) => {
    return (
        <>
            <div className="table-summary">
                <h2 onClick={showHideSummary}>Podsumowanie <span className="accordion-arrow">⮟</span></h2>
                <div className="summary-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Kategoria:</th>
                            <th>Ilość:</th>
                            <th>Cena:</th>
                        </tr>
                        {
                            cat.map(singleCat => {
                                const category = data.filter(el => el.cat === singleCat);
                                let sum = 0;
                                category.map(el => {
                                    sum += Number(el.price);
                                });
                                return (
                                    <tr key={singleCat}>
                                        <td>{singleCat}</td>
                                        <td>{category.length}</td>
                                        <td>{sum} zł</td>
                                    </tr>
                                )
                            })
                        }
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}