import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import CardPlayer from './CardPlayer';

const Cards = ({ show }) => {

    const cards = [
        {
            x: 200,
            y: -100,
            delay: 400
        },
        {
            x: 100,
            y: -50,
            delay: 200
        },
        {
            x: 0,
            y: 0,
            delay: 0
        }
    ];

    const showCards = () => {
        return !show ? null : cards.map((card, i) => (
            <Animate
                key={i}
                start={{
                    left: 0,
                    top: 0
                }}

                enter={{
                    left: [card.x],
                    top: [card.y],
                    timing: { delay: card.delay, duration: 200, ease: easePolyOut },
                }}
            >
                {({ left, top }) =>
                    <div style={{
                        transform: `translate(${left}px, ${top}px)`
                    }}>
                        <CardPlayer
                            bck={Otamendi}
                            number={30}
                            name='Nicolas'
                            lastname='Otamendi'
                        />
                    </div>
                }

            </Animate>
        ));
    }

    return (
        <div>
            {showCards()}
        </div>
    );
}

export default Cards;
