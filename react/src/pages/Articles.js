import React from "react";
const status = require("../Common.js").checkStatus;
const Item = require("../Common.js").Item;

export default function Articles() {

    document.title = "Dagligvare - varer";
// Hook: setArticles([arg]), resultat: articles     
    const [articles, setArticles] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState(-1);
    const [errorMsg, setErrorMsg] = React.useState(null);

/* Henter varer: prefiks /server -> leter etter http:localhost:3001/varer (se webpack.config.js)
   Henter på nytt hvis brukeren velger en annen varegruppe 
   Kaller status (Common.js.checkStatus)  
   Hvis status != Error -> response.json() -> setArticles()
   Hvis status == Error -> kaller setErrorMsg()
*/     
    React.useEffect(() => {
        fetch("/server/varer?vgr=" + selectedCategory)
            .then(status)
            .then((response) => response.json())
            .then((data) => setArticles(data.message))
            .catch(error => setErrorMsg("Feil ved les varer: " + error)); 
      }, [selectedCategory]);
// Returnerer HTML (for Outlet, se Layout.js)      
// Hvis errorMsg er utfylt, skal den vises, ellers varetabell med heading
// ArticleTable bygges med articles, resultatet av setArticles
    if (errorMsg)
        return <>{errorMsg}</>
    else
        return (
            <div>
                <h2 align="center">Varer</h2> 
                <table align="center">
                    <tbody>
                    <tr><td><CategoryCb setSelectedCategory={setSelectedCategory}/></td></tr>
                    <tr><td><ArticleTable articles={articles} /></td></tr>
                    </tbody>
                </table>
            </div>
        )
}

/* Combobox 
Mottar setSelectedCategory fra nivået over for å kunne angi at ny varegruppe er valgt
*/
function CategoryCb({setSelectedCategory})
{
    const [categories, setCategories] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const handleChange = (event) =>
    {
        event.preventDefault();

        let cb = document.getElementById(event.target.id);
        let newSelectedId = cb.options[cb.selectedIndex].id;

        setSelectedCategory(newSelectedId);
    }    

    React.useEffect(() => {
        fetch("/server/varegrupper")
            .then(status)
            .then((response) => response.json())
            .then((data) => setCategories(data.message))
            .catch(error => setErrorMsg("Feil ved les varegrupper: " + error)); 
      }, []);

    const options = [];

    let defaultItem = new Item(-1, "...", false);
    options.push(<ItemOption item={defaultItem} key={defaultItem.id}/>);   

    if (categories)
    {
// JSONCategory: Category/Varegruppe som JSON-string    
        categories.forEach((JSONCategory) =>
        {
            let store = new Item(JSONCategory.id, JSONCategory.name, false);
            options.push(<ItemOption item={store} key={store.id}/>);   
        });
    }

    if (errorMsg)
        return <>{errorMsg}</>
    else
        return (
            <span> 
                <label htmlFor="categorycb">  Varegruppe:  </label>
                <select id="categorycb" onChange={handleChange}>
                    {options}
                </select>
            </span>
        )
}

// html option for én varegruppe
function ItemOption({item})
{
    return <option id={item.id}>{item.name}</option>
}

// Bygger varetabell
function ArticleTable({ articles }) 
{
    const rows = [];

// Løper gjennom articles    
    if (articles)
    {
        articles.forEach((article) => 
        {
// Bygger en ItemRow (i ItemRow.js) og legger til i array rows            
            rows.push(<ArticleRow item={article} key={article.id} />);
        });
    }

// Returnerer hele tabellen, med heading og rows
    return (
        <table align="center">
        <thead>
            <tr>
            <th>Varenr</th>
            <th>Vare</th>
            <th>Varegruppe</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
    );
}

function ArticleRow ({item}) 
{
    return (
        <tr className="list">
            <td className="list">{item.id}</td>
            <td className="list">{item.name}</td>
            <td className="list">{item.categoryName}</td>
        </tr>
    )
}