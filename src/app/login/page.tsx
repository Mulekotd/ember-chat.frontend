'use client'

import { Eye, EyeOff, Flame, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import React, { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { darkMode } = useConfig();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center p-6 transition-all duration-500"
            style={{
                backgroundColor: darkMode ? '#30302E' : 'white',
                background: darkMode ? '#30302E' : 'linear-gradient(135deg, white 0%, #fef2f2 50%, white 100%)',
                color: darkMode ? 'white' : '#111827'
            }}
        >
            {/* Login Card */}
            <Card
                className="w-full max-w-md p-8 border transition-all duration-300"
                style={{
                    backgroundColor: darkMode ? '#3D3D3B' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: darkMode ? '#262624' : 'rgba(254, 202, 202, 0.5)',
                    backdropFilter: darkMode ? 'none' : 'blur(8px)'
                }}
            >
                <div className="text-center mb-8">
                    <div className={`p-3 rounded-lg w-fit mx-auto mb-4 ${darkMode ? 'bg-red-600' : 'bg-red-500'}`}>
                        <Flame className="w-8 h-8 text-white" />
                    </div>
                    <h1 className={`text-2xl font-bold mb-2 ${darkMode && 'text-white'}`}>Bem-vindo de volta!</h1>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Entre para iniciar novas conversas
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={form.email}
                                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                className={`pl-10 ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500'
                                    : 'bg-white border-red-200 focus:border-red-400'
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                            Senha
                        </Label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                                className={`pl-10 pr-10 ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500'
                                    : 'bg-white border-red-200 focus:border-red-400'
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                id="remember"
                                type="checkbox"
                                className={`rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-red-300'}`}
                            />
                            <Label htmlFor="remember" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Lembrar de mim
                            </Label>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className={`w-full py-3 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors duration-200`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Não tem uma conta?{' '}
                        <Link
                            href="/register"
                            className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'} hover:underline font-medium`}
                        >
                            Registre-se
                        </Link>
                    </p>
                </div>
            </Card>
        </main>
    );
}
