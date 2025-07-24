'use client'

import { Check, Eye, EyeOff, Flame, Lock, Mail, Shield, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/header';
import Link from 'next/link';

import React, { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';

export default function SignUpPage() {
    const { darkMode } = useConfig();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (field === 'password') {
            // Calcular força da senha
            let strength = 0;
            if (value.length >= 8) strength++;
            if (/[A-Z]/.test(value)) strength++;
            if (/[a-z]/.test(value)) strength++;
            if (/\d/.test(value)) strength++;
            if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }

        setIsLoading(true);

        // Simular processo de registro
        setTimeout(() => {
            setIsLoading(false);
            // Aqui você implementaria a lógica de registro
            console.log('Register attempt:', formData);
        }, 1500);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 2) return darkMode ? '#ef4444' : '#dc2626';
        if (passwordStrength < 4) return darkMode ? '#f59e0b' : '#d97706';
        return darkMode ? '#10b981' : '#059669';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength < 2) return 'Fraca';
        if (passwordStrength < 4) return 'Média';
        return 'Forte';
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
            {/* Register Card */}
            <Card
                className="w-full max-w-md p-8 border transition-all duration-300 mt-10"
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
                    <h1 className={`text-2xl font-bold mb-2 ${darkMode && 'text-white'}`}>Criar conta</h1>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Junte-se à revolução das conversas efêmeras
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                            Nome completo
                        </Label>
                        <div className="relative">
                            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <Input
                                id="name"
                                type="text"
                                placeholder="Seu nome"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`pl-10 ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500'
                                    : 'bg-white border-red-200 focus:border-red-400'
                                    }`}
                                required
                            />
                        </div>
                    </div>

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
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
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
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
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

                        {formData.password && (
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                        Força da senha:
                                    </span>
                                    <span style={{ color: getPasswordStrengthColor() }}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>
                                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-300 rounded-full"
                                        style={{
                                            width: `${(passwordStrength / 5) * 100}%`,
                                            backgroundColor: getPasswordStrengthColor()
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className={darkMode ? 'text-gray-200' : 'text-gray-700'}>
                            Confirmar senha
                        </Label>
                        <div className="relative">
                            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className={`pl-10 pr-10 ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500'
                                    : 'bg-white border-red-200 focus:border-red-400'
                                    }`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="text-xs text-red-500 flex items-center">
                                <span>As senhas não coincidem</span>
                            </p>
                        )}

                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <p className={`text-xs flex items-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                <Check className="w-3 h-3 mr-1" />
                                Senhas coincidem
                            </p>
                        )}
                    </div>

                    <div className="flex items-start space-x-3">
                        <input
                            id="terms"
                            type="checkbox"
                            className={`mt-1 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'border-red-300'}`}
                            required
                        />
                        <Label htmlFor="terms" className={`text-sm leading-tight ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Eu concordo com os Termos de Serviço e Política de Privacidade
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className={`w-full py-3 ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors duration-200`}
                        disabled={isLoading || formData.password !== formData.confirmPassword}
                    >
                        {isLoading ? 'Criando conta...' : 'Criar conta'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Já tem uma conta?{' '}
                        <Link
                            href="/login"
                            className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'} hover:underline font-medium`}
                        >
                            Fazer login
                        </Link>
                    </p>
                </div>   
            </Card>
        </main>
    );
}
