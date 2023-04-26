import React from 'react';

function DonationList({listId, donations}) {

    const renderedGifts = donations.map((gift) => {
        const leftContent =
            <>
                <span>Výše daru: {gift.price} Kč</span>
                <span>Cílová sbírka: '{gift.donatableId.title}'</span>
                <span>Datum: '{gift.createdAt}'</span>
            </>

        const rightContent =
            <>
                <span>Od '{gift.name}'</span>
            </>

        return (
            <li key={gift._id}>
                <div className="left">
                    { leftContent }
                </div>
                <div className="right">
                    { rightContent }
                </div>
            </li>
        )
    })

    return <ul id={listId}>{renderedGifts}</ul>;
}

export default DonationList;