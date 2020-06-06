import React from 'react';
import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';

import FeaturedPlayer from '../../Resources/images/featured_player.png';

const Text = () => {

    const animateNumber = () => (
        <Animate
            start={{
                opacity: 0,
                rotate: 0
            }}

            enter={{
                opacity: [1],
                rotate: [360],
                timing: { duration: 1000, ease: easePolyOut }
            }}
        >

            {({ opacity, rotate }) => (
                <div
                    className='featured_number'
                    style={{
                        opacity: opacity,
                        transform: `rotateY(${rotate}deg)`
                    }}
                >3</div>
            )}

        </Animate>
    );

    const animateFirst = () => (
        <Animate
            start={{
                opacity: 0,
                x: 200
            }}

            enter={{
                opacity: [1],
                x: [0],
                timing: { duration: 500, ease: easePolyOut }
            }}
        >

            {({ opacity, x }) => (
                <div
                    className='featured_first'
                    style={{
                        opacity: opacity,
                        transform: `translateX(${x}px)`
                    }}
                >League</div>
            )}

        </Animate>
    )

    const animationSecond = () => (
        <Animate
            start={{
                opacity: 0,
                x: 200
            }}

            enter={{
                opacity: [1],
                x: [0],
                timing: { duration: 500, ease: easePolyOut, delay: 200 }
            }}
        >

            {({ opacity, x }) => (
                <div
                    className='featured_second'
                    style={{
                        opacity: opacity,
                        transform: `translateX(${x}px)`
                    }}
                >Championships</div>
            )}

        </Animate>
    )

    const animatePlayer = () => (
        <Animate
            start={{
                opacity: 0,
            }}

            enter={{
                opacity: [1],
                timing: { duration: 1000, ease: easePolyOut, delay: 200 }
            }}
        >

            {({ opacity }) => (
                <div
                    className='featured_player'
                    style={{
                        opacity: opacity,
                        background: `url(${FeaturedPlayer})`
                    }}
                ></div>
            )}

        </Animate>
    )

    return (
        <div className='featured_text'>
            <div className='featured_text_wrapper'>
                {animatePlayer()}
                {animateNumber()}
                {animateFirst()}
                {animationSecond()}
            </div>
        </div>
    );
}

export default Text;
