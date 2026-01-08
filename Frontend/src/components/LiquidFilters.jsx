import React from 'react';

const LiquidFilters = () => {
    return (
        <svg className="hidden fixed top-0 left-0 w-0 h-0 pointer-events-none">
            <defs>
                <filter id="liquid-distortion">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.015 0.015"
                        numOctaves="1"
                        seed="2"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>

                <filter id="liquid-reveal-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>
            </defs>
        </svg>
    );
};

export default LiquidFilters;
