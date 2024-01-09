import { useEffect, useState } from "react";

export default function useThemePreference() {
    const [theme, setTheme] = useState<string>("light");
    useEffect(() => {
        const setThemePreference = () => {
            const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(isDarkMode ? "dark" : "light");
        };

        setThemePreference();

        // Listen for changes in the user's color scheme preference
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setThemePreference);

        return () => {
            // Remove the event listener when the component is unmounted
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", setThemePreference);
        };
    }, []);

    return {
        theme
    }
}
