export type ConfigProps = {
    i18n: string;
    darkMode: boolean;
    handleChangeLocation: (lang: string) => void;
    handleChangeMode: (isDark: boolean) => void;
};
