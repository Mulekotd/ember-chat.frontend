import { useConfig } from "@/hooks/useConfig";

export default function Footer() {
    const { darkMode } = useConfig();

    return (
        <footer
            className="py-12 px-6 border-t"
            style={{
                backgroundColor: darkMode ? '#30302E' : 'rgba(255, 255, 255, 0.5)',
                borderColor: darkMode ? '#262624' : 'rgba(254, 202, 202, 0.5)'
            }}
        >
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        © 2025 Ember Chat. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
}