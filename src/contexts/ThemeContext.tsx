import { createContext, ReactNode, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
    children: ReactNode;
}

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        /*mesma coisa que seria se por o valor fixo de light,
        porem assim permite por mais codigo e ate essa função,
        que inicia com o valor armazenado do tema da ultima vez.*/
        const storagedTheme = localStorage.getItem('theme')

        return (storagedTheme ?? 'light') as Theme;
    });

    //faz que a aplicação se lembre de qual era o tema da ultima vez
    useEffect(() => {
        localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

    function toggleTheme() {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}