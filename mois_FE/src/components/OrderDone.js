import React from 'react';

function OrderDone({ setOrderDone, customAddress, price, makingTime }) {

    const completeTime = () => {
        let final_time = new Date()
        final_time.setTime(final_time.getTime() + (makingTime*60*1000))
        return final_time
    }

    return (
        <div id="order-done">
            <h3>OBJEDNÁVKA DOKONČENA</h3>
            <p>
                CENA OBJEDNÁVKY: { price } KČ<br/>
                ČAS { customAddress ? "DORUČENÍ" : "DOKONČENÍ" }: {completeTime().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
            <button onClick={ () => { setOrderDone(false) }} >DALŠÍ OBJEDNÁVKA</button>
        </div>
    );
}

export default OrderDone;