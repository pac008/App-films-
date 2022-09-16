import React, { createContext, useState } from "react";

interface ImageColors {
    primary: string;
    secondary: string;
}

interface ContextProps {
    colors: ImageColors;
    prevColors: ImageColors;
    setPrevMainColor: (colors: ImageColors) => void;
    setMainColor: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({ children }: any) => {

    const [colors, setColor] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    })
    const [prevColors, setPrevColor] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    })

    const setMainColor = (colors:ImageColors) => {
        setColor(colors)
    }
    const setPrevMainColor = (colors:ImageColors) => {
        setPrevColor(colors)
    }
    return (
        <GradientContext.Provider value={{
            colors,
            prevColors,
            setMainColor,
            setPrevMainColor
        }}>
            {children}
        </GradientContext.Provider>
    )
}