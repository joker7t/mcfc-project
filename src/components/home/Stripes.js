import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

const Stripes = () => {

    const stripes = [
        {
            background: '#98c5e9',
            left: 120,
            rotate: 25,
            top: -260,
            delay: 0
        },
        {
            background: '#ffffff',
            left: 360,
            rotate: 25,
            top: -397,
            delay: 200
        },
        {
            background: '#98c5e9',
            left: 600,
            rotate: 25,
            top: -498,
            delay: 400
        }
    ];

    const showStripes = () => {
        return stripes.map((stripe, i) => (
            <Animate
                key={i}

                start={{
                    // background: '#ffffff',
                    opacity: 0,
                    left: 0,
                    rotate: 0,
                    top: 0
                }}

                enter={{
                    //need [] to work
                    //new version, just work with number
                    // background: [stripe.background],
                    opacity: [1],
                    left: [stripe.left],
                    rotate: [stripe.rotate],
                    top: [stripe.top],
                    timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
                    events: {
                        end() {
                            console.log('animation home finished')
                        }
                    }
                }}
            >

                {
                    // this content must be a function
                    // pass the prop need to be animated to this function
                }
                {({ opacity, left, rotate, top }) =>
                    <div
                        className="stripe"
                        style={{
                            background: stripe.background,
                            opacity,
                            transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`
                        }}
                    ></div>
                }

            </Animate>
        ));
    }

    return (
        <div className='featured_stripes'>
            {showStripes()}
        </div>
    );
}

export default Stripes;
