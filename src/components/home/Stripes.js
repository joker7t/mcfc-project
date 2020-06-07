import React from 'react';
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

const Stripes = () => {

    const stripes = [
        {
            name: 'stripe-1',
            delay: 0
        },
        {
            name: 'stripe-2',
            delay: 200
        },
        {
            name: 'stripe-3',
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
                    left: -200,
                    rotate: 0
                }}

                enter={{
                    //need [] to work
                    //new version, just work with number
                    // background: [stripe.background],
                    opacity: [1],
                    left: [0],
                    rotate: [30],
                    timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
                    // events: {
                    //     end() {
                    //         console.log('animation home finished')
                    //     }
                    // }
                }}
            >

                {
                    // this content must be a function
                    // pass the prop need to be animated to this function
                }
                {({ opacity, left, rotate }) =>
                    <div
                        className={"stripe " + stripe.name}
                        style={{
                            opacity,
                            transform: `rotate(${rotate}deg) translateX(${left}px)`
                        }}
                    ></div>
                }

            </Animate>
        ));
    }

    return (
        <div className='featured_stripes'>
            {
                showStripes()
            }




        </div>
    );
}

export default Stripes;
