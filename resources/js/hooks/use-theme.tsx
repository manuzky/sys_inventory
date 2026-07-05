import { useEffect, useState } from 'react';

export type Theme = 'default' | 'green' | 'vercel' | 'amber';

const themes: Theme[] = ['default', 'green', 'vercel', 'amber'];

const applyTheme = (theme: Theme) => {
    const html = document.documentElement;

    // Elimina todos los temas
    html.classList.remove(...themes.map((t) => `theme-${t}`));

    // Agrega el seleccionado
    html.classList.add(`theme-${theme}`);
};

export function initializeThemeColor() {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'default';

    applyTheme(savedTheme);
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('default');

    const updateTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        updateTheme(savedTheme || 'green');
    }, []);

    return {
        theme,
        updateTheme,
    };
}