import React, {useRef, useState} from 'react';
import Input from "./Input";
import OrderDone from "./OrderDone";
import {FaUser} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {RiLockPasswordFill, RiShoppingBasket2Line} from "react-icons/ri";
import {makeRequest} from "../utils/requests";


function Basket({ food, foodCountReset }) {
    const [ street, setStreet ] = useState("")
    const [ postal, setPostal ] = useState("")
    const [ customAddress, setCustomAddress ] = useState(null);
    const [ showBasket, setShowBasket ] = useState(false)
    const [ ordering, setOrdering ] = useState(false);
    const [ confirmedPrice, setConfirmedPrice ] = useState(null)
    const [ makingTime, setMakingTime ] = useState(null)
    const [ orderCreated, setOrderCreated ] = useState(false)
    const submitButton = useRef(null)
    const basketContent = useRef(null)
    let derivedPrice = food.reduce((total, food) => total += food.price * food.count, 0)


    const handleShowBasket = () => {
        if (showBasket) { // closing
            basketContent.current.classList.add("hide")
            setOrdering(false)
        } else {
            basketContent.current.classList.remove("hide")
            setCustomAddress(null)
        }
        setShowBasket(!showBasket)
    }

    const handleResetFood = () => {
        setOrdering(false)
        setCustomAddress(null)
        foodCountReset()
    }

    const handleOrdering = () => {
        setOrdering(!ordering)
        setCustomAddress(null)
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        submitButton.current.disabled = true;

        try {
            let data = {
                menu: [],
                address: {city: "Praha", street, postal}
            }

            food.forEach((food) => {
                if (food.count > 0) {
                    data.menu.push({id: food.id, count: food.count})
                }
            })

            const response = await makeRequest("/order/", data);
            if (response["json_status"] < 300) {
                setOrderCreated(true)
                setConfirmedPrice(response.data.price)
                setMakingTime(response.data.makingTime)
            } else if (response["json_status"] === 432){
                alert("Restaurace má již bohužel zavřeno.\nNení možné vytvářet objednávku.")
            }
            else {
                console.log("NECO JE SPATNE  S OBJEDNAVKOU")
            }// TODO errory

            handleShowBasket()
            foodCountReset()
        } catch (e) {
        }
        finally {
            submitButton.current.disabled = false
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value
        switch (event.target.id) {
            case "street":
                setStreet(value)
                break;
            case "postal":
                setPostal(value)
                break;
            default:
                console.log("EVENT NENALEZEN", event)
        }
    }

    const orderingForm = () => {
        if (!ordering || !derivedPrice) return null

        if (customAddress === null) {

            const handleClickNotCustomAddress = () => {
                setCustomAddress(false)
                setStreet("V Záhoří 158")
                setPostal("15800")
            }

            return (
                <div key="custom-address">
                    <h3>ŽÁDÁTE DOPRAVU?</h3>
                    <button type="button" onClick={handleClickNotCustomAddress}>NE - VYZVEDNU SI</button>
                    <br />
                    <button type="button" id="custom" onClick={() => {setCustomAddress(true)}}>ANO - NECHAT DOVÉST ZA 70 KČ</button>
                </div>
            )
        } else if (customAddress === true) {
            renderedFood.push(
                <li key="transport">
                    <span>DOPRAVA 70 KČ</span>
                    <span>1</span>
                </li>
            )
        }

        return (
            <div key="order-form">
                <h3>ADRESA DODÁNÍ{!customAddress && " (PRODEJNA)"}:</h3>
                <form className="in-column" onSubmit={handleSubmitForm}>
                    <Input
                        label={<>{<FaUser/>}MĚSTO</>}
                        id="city"
                        type="text"
                        value="PRAHA"
                        disabled={true}/>
                    <Input
                        label={<>{<MdEmail/>}ULICE A ČP:</>}
                        id="street"
                        type="text"
                        placeholder="Kafkova 2727/8"
                        value={street}
                        onChange={handleFormChange}
                        disabled={!customAddress}/>
                    <Input
                        label={<>{<RiLockPasswordFill/>}PSČ</>}
                        id="postal"
                        type="text"
                        placeholder="15500"
                        value={postal}
                        onChange={handleFormChange}
                        disabled={!customAddress}/>

                    <button ref={submitButton} type="submit">ZÁVAZNĚ OBJEDNAT</button>
                </form>
                <button onClick={handleOrdering}>STORNO</button>
            </div>
        )
    }

    const renderedFood = []
    food.forEach((food) => {
        if (food.count > 0) {
            renderedFood.push(
                <li key={food.id} data-key={food.id}>
                    <span>{food.category} - {food.title}</span>
                    <span>{food.count}</span>
                </li>
            )
        }
    })

    const content = []
    if (renderedFood.length > 0) {
        content.push(<button key="rest" id="reset" style={{visibility: !ordering ? "visible" : "hidden"}} onClick={handleResetFood}>RESETOVAT KOŠÍK</button>)
        content.push(
            <ul key="basket-list" id="basket-list">
                <li>
                    <span><b>POLOŽKA</b></span>
                    <span><b>MNOŽSTVÍ</b></span>
                </li>
                {renderedFood}
            </ul>)
        content.push(<span key="price" id="price"><b>CENA: {customAddress ? derivedPrice + 70 : derivedPrice} KČ</b></span>)
        content.push(orderingForm() || <button key="order-start" onClick={handleOrdering}>ZAČÍT OBJEDNÁVKU</button>)
    } else {
        content.push("ZATÍM TU NENÍ ŽÁDNÉ JÍDLO")
    }

    const showText = !showBasket ? "ZOBRAZIT KOŠÍK" : "SKRÝT KOŠÍK"
    return (
        <div>
            {
                orderCreated ? <OrderDone setOrderDone={setOrderCreated} customAddress={customAddress} price={confirmedPrice} makingTime={makingTime} /> :
                    <>
                        <button id="basket-show-toggle" onClick={handleShowBasket}>{<><RiShoppingBasket2Line />{showText}</>}</button>
                        <div ref={basketContent} id="basket-content" className="hide">
                            <h3>VÁŠ KOŠÍK:</h3>
                            { content }
                        </div>
                    </>
            }
        </div>
    );
}

export default Basket;