'use client'

import { Shield, Sparkles, Timer, Zap } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Footer from '@/components/footer';
import Header from '@/components/header';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@/hooks/useConfig';

export default function Landing() {
  const [animatedText, setAnimatedText] = useState('');
  const { darkMode } = useConfig();

  const fullText = 'Conversas que desaparecem como chamas';

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Timer className="w-6 h-6" />,
      title: 'Mensagens Temporárias',
      description: 'Suas conversas desaparecem automaticamente quando você sai da sessão'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacidade Total',
      description: 'Comunicação P2P sem armazenamento permanente de dados'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Super Rápido',
      description: 'Conexão instantânea e interface otimizada para velocidade'
    }
  ];

  const stats = [
    { number: '1K+', label: 'Usuários Ativos' },
    { number: '25K+', label: 'Mensagens/Dia' },
    { number: '99.9%', label: 'Uptime' },
    { number: '0', label: 'Dados Armazenados' }
  ];

  return (
    <main
      className="min-h-screen transition-all duration-500"
      style={{
        backgroundColor: darkMode ? '#30302E' : 'white',
        background: darkMode ? '#30302E' : 'linear-gradient(135deg, white 0%, #fef2f2 50%, white 100%)',
        color: darkMode ? 'white' : '#111827'
      }}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className={`mb-8 ${darkMode ? 'bg-red-700 text-red-100 border-red-600' : 'bg-red-100 text-red-700 border-red-300'}`}>
            <Sparkles className="w-4 h-4 mr-2" />
            Nova Era de Comunicação Privada
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className={`bg-gradient-to-r ${darkMode
              ? 'from-white to-red-300'
              : 'from-gray-900 via-red-600 to-red-800'
              } bg-clip-text text-transparent`}>
              Ember Chat
            </span>
          </h1>

          <p className={`text-xl md:text-2xl mb-12 min-h-[3rem] ${darkMode ? 'text-gray-200' : 'text-gray-600'
            }`}>
            {animatedText}
            <span className={`animate-pulse ml-1 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>|</span>
          </p>

          {/* Live Demo Preview */}
          <Card
            className="max-w-4xl mx-auto p-6 border"
            style={{
              backgroundColor: darkMode ? '#3D3D3B' : 'rgba(255, 255, 255, 0.6)',
              borderColor: darkMode ? '#262624' : 'rgba(254, 202, 202, 0.5)',
              backdropFilter: darkMode ? 'none' : 'blur(4px)'
            }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
                <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}></div>
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Chat - Sessão Ativa
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback className={`${darkMode ? 'bg-red-600' : 'bg-red-500'} text-white`}>
                    A
                  </AvatarFallback>
                </Avatar>
                <div
                  className="max-w-xs p-3 rounded-lg"
                  style={{
                    backgroundColor: darkMode ? '#4A4A48' : '#f3f4f6'
                  }}
                >
                  <p className={`text-sm ${darkMode && 'text-white'}`}>Essa mensagem vai desaparecer quando você sair! 🔥</p>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    agora
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 flex-row-reverse">
                <Avatar>
                  <AvatarFallback className={`${darkMode ? 'bg-red-600' : 'bg-red-500'} text-white`}>
                    V
                  </AvatarFallback>
                </Avatar>
                <div
                  className="max-w-xs p-3 mr-3 rounded-lg"
                  style={{
                    backgroundColor: darkMode ? '#991b1b' : '#fef2f2'
                  }}
                >
                  <p className={`text-sm ${darkMode && 'text-white'}`}>Perfeito! Privacidade total garantida ✨</p>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    agora
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-16"
        style={{
          backgroundColor: darkMode ? '#3D3D3B' : 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'
                  }`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode
              ? 'bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent'
              }`}>
              Recursos
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-600'
              }`}>
              Tecnologia de ponta para uma experiência de chat única
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 group hover:scale-105 transition-all duration-300 cursor-pointer border"
                style={{
                  backgroundColor: darkMode ? '#3D3D3B' : 'rgba(255, 255, 255, 0.6)',
                  borderColor: darkMode ? '#262624' : 'rgba(254, 202, 202, 0.5)',
                  backdropFilter: darkMode ? 'none' : 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = darkMode ? '#262624' : 'rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = darkMode ? '#262624' : 'rgba(254, 202, 202, 0.5)';
                }}
              >
                <div className='flex flex-row gap-2 items-center'>
                  <div
                    className="p-3 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: darkMode ? '#b91c1c' : '#fef2f2',
                      color: darkMode ? '#fef2f2' : '#dc2626'
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${darkMode && "text-white"}`}>{feature.title}</h3>
                </div>

                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-6"
        style={{
          backgroundColor: darkMode ? '#3D3D3B' : 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <div className="container mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${darkMode
            ? 'bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent'
            }`}>
            Pronto para a revolução?
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-600'
            }`}>
            Junte-se a milhares de usuários que já descobriram o poder da comunicação efêmera
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className={`${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white px-12 py-6 text-lg group`}>
              Iniciar Chat Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
