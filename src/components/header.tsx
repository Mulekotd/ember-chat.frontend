import { Flame, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

import { useConfig } from '@/hooks/useConfig';

export default function Header() {
    const { darkMode, handleChangeMode } = useConfig();

    return (
        <header
            className="fixed top-0 w-full z-50 border-b transition-all duration-300"
            style={{
                backgroundColor: darkMode ? '#30302E' : 'rgba(255, 255, 255, 0.5)',
                borderColor: darkMode ? '#262624' : 'rgba(254, 202, 202, 0.5)',
                backdropFilter: darkMode ? 'none' : 'blur(12px)'
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-600' : 'bg-red-500'}`}>
                        <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-lg sm:text-xl font-bold">Ember Chat</span>
                </Link>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="hidden sm:flex items-center space-x-2">
                        <Sun className="w-4 h-4" />
                        <Switch
                            checked={darkMode}
                            onCheckedChange={handleChangeMode}
                            className="data-[state=checked]:bg-red-600"
                        />
                        <Moon className="w-4 h-4" />
                    </div>

                    <Link href="/login">
                        <Button
                            variant="outline"
                            className={`px-3 sm:px-4 text-sm font-medium border bg-transparent hover:bg-transparent sm:border-none sm:bg-transparent ${darkMode ? 'text-white hover:text-gray-300 border-white hover:border-gray-300' : 'text-black hover:text-gray-700 border-black hover:border-gray-700'} hover:cursor-pointer transition`}
                        >
                            Sign in
                        </Button>
                    </Link>

                    <Link href="/register" className="hidden sm:block">
                        <Button
                            variant="outline"
                            className={`px-4 text-sm font-medium border bg-transparent hover:bg-transparent ${darkMode ? 'text-white hover:text-gray-300 border-white hover:border-gray-300' : 'text-black hover:text-gray-700 border-black hover:border-gray-700'} hover:cursor-pointer transition`}
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}