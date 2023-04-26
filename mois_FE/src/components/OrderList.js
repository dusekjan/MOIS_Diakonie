import React from 'react';

function OrderList({listId, orders, orderDetails, handleToggleDetail, handleChangeStatus}) {
    const renderedOrderList =
        [...orders]
        .sort((a, b) => b.id - a.id )
        .map((order) => {
        let status;
        switch (order.is_done) {
            case "true":
                status = <span className="status done">HOTOVÁ</span>
                break;
            case "false":
                status = <span className="status in-progress">PROBÍHÁ</span>
                break;
            case "cancel":
                status = <span className="status cancel">ZRUŠENA</span>
                break;
            default:
                status = ""
        }

        const extendThisRow = orderDetails && orderDetails.id === order.id

        let leftContent;
        if (extendThisRow) {
            let renderedFoodList = orderDetails.food.map((food, index) => {
                return (
                    <li key={`${index}-${food.id}`}>
                        {food.category} - {food.title} {food.price} KČ
                    </li>
                )
            })

            if (orderDetails["custom_address"]) {
                renderedFoodList.push(
                    <li key="transport">
                        DOPRAVA 70 KČ
                    </li>
                )
            }

            let renderedAddress = null;
            if (orderDetails["address"]) {
                const address = orderDetails["address"]
                renderedAddress =
                    <>
                        <span style={{textTransform: "none"}}>JMÉNO: '{orderDetails["user_name"]}'</span>
                        <span style={{textTransform: "none"}}>EMAIL: '{orderDetails["user_email"]}'</span>
                        <span>ADRESA: {orderDetails["custom_address"] ? "VLASTNÍ" : "PRODEJNA"}</span>
                        <ul>
                            <li key="city">MĚSTO: {address.city}</li>
                            <li key="street">ULICE: {address.street}</li>
                            <li key="postal">PSČ: {address.postal_code}</li>
                        </ul>
                    </>
            }

            leftContent =
                <>
                    <span>OBJEDNÁVKA č. {order.id}: <span className="status">{status}</span></span>
                    <span>{orderDetails.created}</span>
                    <ol>{renderedFoodList}</ol>
                    <span>ODHADOVANÝ ČAS PŘÍPRAVY: {order.making_time} MINUT</span>
                    <span id="price">CELKOVÁ CENA: {order.price} KČ</span>
                    { renderedAddress }
                </>
        } else {
            leftContent =
                <>
                    <span>OBJEDNÁVKA č. {order.id}: <span className="status">{status}</span></span>
                    <span>{order.created}</span>
                    <span id="price">CENA: {order.price} KČ</span>
                </>
        }

        let rightContent = <button onClick={() => {handleToggleDetail(order.id)}}>PODROBNOSTI</button>;
        if (extendThisRow && orderDetails["address"]) { // admin
            rightContent =
                <>
                    <button onClick={() => {handleToggleDetail(order.id)}}>PODROBNOSTI</button>
                    <button className="status done" onClick={() => {handleChangeStatus("true", order.id)}}>HOTOVO</button>
                    <button className="status" onClick={() => {handleChangeStatus("false", order.id)}}>PROBÍHÁ</button>
                    <button className="status cancel" onClick={() => {handleChangeStatus("cancel", order.id)}}>ZRUŠIT</button>
                </>
        }

        return (
            <li key={order.id}>
                <div className="left">
                    { leftContent }
                </div>
                <div className="right">
                    { rightContent }
                </div>
            </li>
        )
    })

    return (
        <ul id={listId}>
            {renderedOrderList}
        </ul>
    );
}

export default OrderList;