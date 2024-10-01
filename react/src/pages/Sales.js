import React from "react";
const Item = require("../Common.js").Item;
const status = require("../Common.js").checkStatus;
const Receipt = require("../pagelets/Receipt.js").default;

// todo alert -> errorMsg overalt
// todo Trenger jeg f.eks. selectedSaleId i SaleTable etc?

export default function SalePage()
{
    document.title = "Dagligvare - gjennomførte salg";

    const [periodData, setPeriodData] = React.useState(null);
    const [latestPeriod, setLatestPeriod] = React.useState(null);

/*  Henter alle perioder med handler
    Resultatsett m/perioder er sortert synkende. Dvs. Den 1. raden (data.message[0]) inneholder den nyeste perioden 
*/
    React.useEffect(() =>
	{
        fetch("/server/perioder")
            .then(status)
            .then((response) => response.json())
            .then((data) => 
            {
                setPeriodData(data.message);
                setLatestPeriod(data.message[0]);
            })
            .catch(error => {alert("Feil ved les av perioder: " + error)}); 
    }, []);
    
    if (periodData && latestPeriod)
        return <div><h2 align="center">Gjennomførte salg</h2>{<Sales periodData={periodData} latestPeriod={latestPeriod}/>}</div>    
}

function Sales({periodData, latestPeriod})
{
    const [selectedStore, setSelectedStore] = React.useState(0);
    const [selectedCustomer, setSelectedCustomer] = React.useState(-1);
    const [selectedPeriod, setSelectedPeriod] = React.useState(latestPeriod.id);

    return (
        <div>
            <table align="center">
                <tbody>
                	<tr>
						<td><StoreCb setSelectedStore={setSelectedStore}/>
                        <CustomerCb setSelectedCustomer={setSelectedCustomer}/>
                        <PeriodCb setSelectedPeriod={setSelectedPeriod} periodData={periodData} latestPeriod={latestPeriod}/></td>
					</tr>
                	<tr><td><OuterTable selectedStore={selectedStore} selectedCustomer={selectedCustomer} selectedPeriod={selectedPeriod}/></td></tr>
                </tbody>
            </table>
        </div>
        )
}

function OuterTable({selectedStore, selectedCustomer, selectedPeriod})
{
    const [data, setData] = React.useState(null);
    const [selectedSaleId, setSelectedSaleId] = React.useState(null);
    const [saleData, setSaleData] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

/* Henter handler, event. filtrert på butikk, kunde og/eller periode (måned) */
    React.useEffect(() =>
	{
        var query = "?storeid=" + (selectedStore == 0 ? "" : selectedStore) +
                    "&period=" + (selectedPeriod == 0 ? "" : selectedPeriod) +
                    "&customerid=" + (selectedCustomer == -1 ? "" : selectedCustomer);
        fetch("/server/handler" + query)
            .then(status)
            .then((response) => response.json())
            .then((data) => setData(data.message))
            .catch(error => setErrorMsg("Feil ved les av handler: " + error)); 
    }, [selectedStore, selectedPeriod, selectedCustomer]);

    React.useEffect(() =>
	{
        var query = "?saleid=";
        if (selectedSaleId)
        {
            query = query + selectedSaleId;
            fetch("/server/jsonbong" + query)
                .then(status)
                .then((response) => response.json())
                .then((data) => 
                {
                    let jsonsale = data.message[0];
                    let saledata = JSON.parse(jsonsale.Sale);
                    setSaleData(saledata);
                });
        }
    }, [selectedSaleId]);

    if (data)
        return (    
            <table>
                <tbody>
                <tr>
                    <td>
                    <div>
                        <SaleTable sales={data} selectedSaleId={selectedSaleId} setSelectedSaleId={setSelectedSaleId}/>
                    </div>
                    </td>
                    <td valign="top" width="300"><Receipt saleData={saleData}/></td>
                </tr>
                </tbody>
            </table>
        )
    else
        return <>{errorMsg}</>
}

function SaleTable({sales, selectedSaleId, setSelectedSaleId})
{
    var rows = [];
    if (sales)
    {
        sales.forEach((sale) => 
        {
            rows.push(<SaleRow sale={sale} selectedSaleId={selectedSaleId} setSelectedSaleId={setSelectedSaleId} key={sale.id}/>);
        });
    }
/* Kjent svakhet i React: 
    Kolonneheading fungerer ikke sammen med overflow m/scroll (se basic.css) 
    <thead className="sales"><tr><th>Butikk</th><th>Kunde</th><th>Handel</th><th>Tidspunkt</th><th>Beløp</th></tr></thead>
*/

    return (
        <table cellPadding="2">
            <tbody className="sales">{rows}</tbody>
        </table>
    )
}

function SaleRow({sale, selectedSaleId, setSelectedSaleId})
{
    var handleClick = (event) =>
    {
        event.preventDefault();

        let newSelectedSaleId = event.target.id;
// todo Trenger jeg dette?
        selectedSaleId = newSelectedSaleId;
        setSelectedSaleId(selectedSaleId);    
    }

    let saleTs = new Date(sale.ts);
/* sale.id er formattert som en knapp vha css
   onClick styrer at kvittering for valgt handel blir vist
*/
    return (
        <>
            <tr className="list">
                <td width="200">{sale.storeName}</td>
                <td>{sale.customerName}</td>
                <td className="selectinrow" id={sale.id} onClick={handleClick}>{sale.id}</td>
                <td>{saleTs.toLocaleString("no-NO")}</td>
                <td width="50" align="right">{sale.amount.toLocaleString("no-NO", {minimumFractionDigits:"2", maximumFractionDigits:"2"})}</td>
            </tr>
        </>
    )
}

function CustomerCb({setSelectedCustomer})
{
    const [customerData, setCustomerData] = React.useState(null);

    React.useEffect(() =>
	{
        fetch("/server/kunder")
            .then(status)
            .then((response) => response.json())
            .then((data) => setCustomerData(data.message))
            .catch(error => {alert("Feil ved les av kunder: " + error)}); 
    }, []);

    const handleChange = (event) =>
    {
        event.preventDefault();

        let custCb = document.getElementById("custcb");
        let custId = custCb.options[custCb.selectedIndex].id;

        setSelectedCustomer(custId);
    }

    const options = [];

    let defaultItem = new Item(-1, "...", false);
    options.push(<ItemOption item={defaultItem} key={defaultItem.id}/>);   
    let zeroItem = new Item(0, "Kontantkunde", false);
    options.push(<ItemOption item={zeroItem} key={zeroItem.id}/>);   

    if (customerData)
    {
        customerData.forEach((JSONcustomer) =>
        {
            let customer = new Item(JSONcustomer.id, JSONcustomer.name, false);
            options.push(<ItemOption item={customer} key={customer.id}/>);   
        });
    }

    return (
        <span> 
            <label htmlFor="custcb">  Kunde:  </label>
            <select id="custcb" onChange={handleChange}>
                {options}
            </select>
        </span>
    )
}

function StoreCb({setSelectedStore})
{
    const [storeData, setStoreData] = React.useState(null);

    React.useEffect(() =>
	{
        fetch("/server/butikker")
            .then(status)
            .then((response) => response.json())
            .then((data) => setStoreData(data.message))
            .catch(error => {alert("Feil ved les av butikker: " + error)}); 
    }, []);

    const handleChange = (event) =>
    {
        event.preventDefault();
        
        let storeCb = document.getElementById("storecb");
        let storeId = storeCb.options[storeCb.selectedIndex].id;

        setSelectedStore(storeId);
    }

    const options = [];

    let defaultItem = new Item(0, "...", false);
    options.push(<ItemOption item={defaultItem} key={defaultItem.id}/>);   

    if (storeData)
    {
        storeData.forEach((JSONStore) =>
        {
            let store = new Item(JSONStore.id, JSONStore.name, false);
            options.push(<ItemOption item={store} key={store.id}/>);   
        });
    }

    return (
        <span> 
            <label htmlFor="storecb">  Butikk:  </label>
            <select id="storecb" onChange={handleChange}>
                {options}
            </select>
        </span>
    )
}

function PeriodCb({periodData, setSelectedPeriod, latestPeriod})
{
    const handleChange = (event) =>
    {
        event.preventDefault();
        
        let periodCb = document.getElementById("periodcb");
        let periodId = periodCb.options[periodCb.selectedIndex].id;

        setSelectedPeriod(periodId);
    }

    const monthNames = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"];
    const latestPeriodFirstDay = new Date(latestPeriod.firstsale.substring(0, 10));
    const latestPeriodName = monthNames[latestPeriodFirstDay.getMonth()] + " " + latestPeriodFirstDay.getFullYear();

    const options = [];

    let defaultItem = new Item(0, "...", false);
    options.push(<ItemOption item={defaultItem} key={defaultItem.id}/>);   

    if (periodData)
    {
        periodData.forEach((JSONPeriod) =>
        {
            const firstDay = new Date(JSONPeriod.firstsale.substring(0, 10));
            const periodName = monthNames[firstDay.getMonth()] + " " + firstDay.getFullYear();

            let period = new Item(JSONPeriod.id, periodName, false);
        
            options.push(<ItemOption item={period} key={period.id}/>);   
        });
    }

    return (
        <span> 
            <label htmlFor="periodcb">  Periode:  </label>
            <select id="periodcb" onChange={handleChange} defaultValue={latestPeriodName}>
                {options}
            </select>
        </span>
    )
}
 
function ItemOption({item})
{
    return <option id={item.id}>{item.name}</option>
}