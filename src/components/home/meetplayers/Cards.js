import React, { useState } from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import CardPlayer from './CardPlayer';

const Cards = ({ show, bck }) => {

    const [isShow, setIsShow] = useState(show);

    return (
        <div>
            <CardPlayer
                bck={Otamendi}
                number={30}
                name='Otamendi'
                lastname='Nicolas'
            />
        </div>
    );
}

export default Cards;
