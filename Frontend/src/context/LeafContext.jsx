import React, { createContext, useContext, useState } from 'react';

const LeafContext = createContext();

export const LeafProvider = ({ children }) => {
    const [currentLeafTarget, setCurrentLeafTarget] = useState(null);

    const setTarget = (target, config = { anchor: 'top-left' }) => {
        if (!target) {
            setCurrentLeafTarget(null);
        } else if (target.nodeType) { // is DOM Element
            setCurrentLeafTarget({ element: target, config });
        } else {
            // Assume object structure if passed
            setCurrentLeafTarget(target);
        }
    };

    return (
        <LeafContext.Provider value={{ currentLeafTarget, setTarget }}>
            {children}
        </LeafContext.Provider>
    );
};

export const useLeaf = () => useContext(LeafContext);
