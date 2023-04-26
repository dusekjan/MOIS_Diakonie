import React from 'react';
import {useFetchRestaurantOpenedQuery, useRestaurantOpenedMutation} from "../store";

function OpenClose() {
    const { data: restaurantOpened } = useFetchRestaurantOpenedQuery()
    const [ setRestaurantOpened ] = useRestaurantOpenedMutation()

    const opened = restaurantOpened ? restaurantOpened.data.opened : null

    const handleOpener = () => {
        setRestaurantOpened(!opened)
    }

    return (
        <div id="opener">
            <h3>
                RESTAURACE JE
                <span className={opened ? "opened" : "closed"}> {opened ? "OTEVŘENÁ" : "ZAVŘENÁ"}</span>
            </h3>
            {!opened && <p>ZÁKAZNÍCI NEMOHOU VYTVÁŘET OBJEDNÁVKY.</p> }
            <button onClick={handleOpener}>{opened ? "ZAVŘÍT" : "OTEVŘÍT"} RESTAURACI</button>
        </div>
    );
}

export default OpenClose;