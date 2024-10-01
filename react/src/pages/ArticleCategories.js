import React from "react";
const ItemRow = require("../pagelets/ItemRow").default;
const status = require("../Common.js").checkStatus;

export default function ArticleCategories() {

    document.title = "Dagligvare - varegrupper";

    const [categories, setCategories] = React.useState(null);

    React.useEffect(() => {
        fetch("/server/varegrupper")
            .then(status)
            .then((response) => response.json())
            .then((data) => setCategories(data.message))
            .catch(error => {alert("Feil ved les av varegrupper: " + error)}) 
    }, []);

    return (
        <>
            <h2 align="center">Varegrupper</h2>
            <ArticleCategoryTable categories={categories} />
        </>
    )
}

function ArticleCategoryTable({ categories }) 
{
    const rows = [];

    if (categories)
    {
        for (let i = 0; i < categories.length; i++)
        {
            let category = categories[i];
            if (category.id === 0) 
                continue;
            rows.push(<ItemRow item={category} key={category.id} />);
        }
    }

    return (
        <table align="center">
            <thead>
                <tr>
                    <th className="list">VaregruppeNr</th>
                    <th className="list">Varegruppe</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}
