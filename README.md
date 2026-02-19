
# 🥊 Capibarismo

*[Leer en Español](#español) | [Read in English](#english)*

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/license/apache-2-0)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
[![Facts Protocol](https://img.shields.io/badge/Facts-Protocol-blue.svg)](CODE_OF_CONDUCT.md)


## Español

Web moderna para informar sobre los distintos candidatos, sus posiciones políticas, propuestas, y trajectorias.

> 🗳️ **Protocolo de Hechos**: Este proyecto sigue un protocolo riguroso de hechos verificables. Cada dato es rastreable hasta fuentes primarias y se presenta con marcas de tiempo, contexto y procedimientos de verificación.
> 
> ⚖️ **Descargo de Responsabilidad**: Esta es una plataforma de información independiente y no partidista. Nos esforzamos por la precisión y neutralidad, presentando hechos verificables de fuentes públicas. Toda la información debe ser verificada de forma independiente. No estamos afiliados a ningún partido político ni candidato.

### ✨ Características Principales

*   **🗳️ Comparación**: Compara posturas de candidatos lado a lado con evidencia respaldada por fuentes
*   **🧭 Brújula Política**: Visualización interactiva que posiciona candidatos en los ejes económico y social
*   **👤 Perfiles Detallados**: Información completa de cada candidato con biografía, trayectoria y creencias
*   **🔍 Filtros Dinámicos**: Filtra y personaliza las comparaciones por candidatos de interés
*   **📱 Diseño Responsivo**: Interfaz optimizada para móviles y escritorio con tema de videojuegos de los 90s
*   **♿ Accesibilidad**: Construido con principios de diseño centrados en accesibilidad

### 🎮 Filosofía UX

Tratamos esta herramienta cívica como un videojuego de pelea. Para mantener el "Game Feel", nos adherimos a contratos estrictos de rendimiento:

*   **🥊 "The Punch" (Feedback Inmediato)**: Respuesta <100ms. Votar se siente visceral e instantáneo.
*   **🌊 "The Flow" (Ritmo Sostenido)**: Transiciones <1.0s. Los usuarios permanecen en la zona sin interrupciones.
*   **📡 "The Reach" (Inclusión Digital)**: Optimizado para todo el Perú  (3G/Alta Latencia). La democracia es para todos.

### 🛠️ Stack Tecnológico

*   **Framework:** React 18 con Vite + TypeScript
*   **Componentes UI:** shadcn/ui + Tailwind CSS
*   **Estado:** Zustand + TanStack Query
*   **Navegación:** React Router con carga lazy
*   **Iconos:** Lucide React + React Icons
*   **Tema:** Estética de videojuegos de lucha de los 90s

### 🚀 Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/SanGoku95/presidential-punch-peru.git
cd presidential-punch-peru
npm install

# Iniciar servidor de desarrollo
npm run dev
# → http://localhost:8080
```

### 📋 Scripts Disponibles

*   `npm run dev` - Servidor de desarrollo con HMR
*   `npm run build` - Compilación para producción
*   `npm run preview` - Previsualizar build de producción
*   `npm run lint` - Análisis de código con ESLint
*   `npm run loadtest:smoke` - Prueba rápida de humo (5 usuarios, 1 min)
*   `npm run loadtest:baseline` - Prueba de rendimiento base (10-50 usuarios, 5 min)

### 📖 Documentación

- **[Guía de Desarrollo](./dev.md)** - Documentación técnica completa
- **[Arquitectura de Componentes](./dev.md#component-architecture)** - Organización de componentes UI
- **[Sistema de Diseño](./dev.md#design-system--theme)** - Detalles del tema gaming de los 90s
- **[Plan de Pruebas de Carga](./docs/load-testing.md)** - Estrategia y procedimientos de pruebas de carga

### 🤝 Contribución

¡Damos la bienvenida a contribuciones de la comunidad! Este es un proyecto de código abierto que se beneficia de perspectivas y experiencia diversas.

**Inicio Rápido para Contribuidores:**
1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

**Pautas Importantes:**
- 📋 Lee nuestra [Guía de Contribución](CONTRIBUTING.md) para instrucciones detalladas
- 🛡️ Sigue nuestro [Código de Conducta](CODE_OF_CONDUCT.md)
- 🗳️ Sigue el **Protocolo de Hechos** para todas las contribuciones de datos
- 📚 Todos los datos deben ser **rastreables hasta fuentes primarias**
- ✅ Prueba tus cambios localmente antes de enviar

**Formas de Contribuir:**
- 🐛 Reportar bugs o sugerir características vía [Issues](https://github.com/SanGoku95/presidential-punch-peru/issues)
- 📊 Ayudar a verificar y actualizar datos de candidatos
- 🌐 Mejorar traducciones (Español/Inglés)
- 💻 Contribuir mejoras de código
- 📖 Mejorar documentación

## 👥 Construido por

Construido por [@SanGoku95](https://github.com/SanGoku95), [@ditodamaster](https://github.com/ditodamaster), [@Daphini-UPT](https://github.com/Daphini-UPT), y [@crafter-station/maintainers](https://github.com/orgs/crafter-station/teams/maintainers)

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Reconocimientos

- Gracias a todos los [contribuidores](https://github.com/SanGoku95/presidential-punch-peru/contributors) que han ayudado a hacer este proyecto posible
- Información de candidatos basada en fuentes públicas y verificables
- Inspirado en la necesidad de transparencia democrática en el Perú

## 📞 Contacto & Comunidad

- 🐛 **Issues**: [GitHub Issues](https://github.com/SanGoku95/presidential-punch-peru/issues)
- 💬 **Discusiones**: [GitHub Discussions](https://github.com/SanGoku95/presidential-punch-peru/discussions)

### 🗂️ Datos & Fuentes

Toda la información de candidatos en este proyecto proviene de fuentes verificables y públicas. Mantenemos:
- **Precisión factual** con atribución adecuada de fuentes
- **Protocolo de hechos** siguiendo estándares rigurosos de verificabilidad
- **Transparencia** en nuestros métodos de recolección de datos
- **Actualizaciones regulares** para mantener la información actualizada

Si encuentras información inexacta, por favor [abre un issue de datos](https://github.com/SanGoku95/presidential-punch-peru/issues/new?template=data_update.md) con fuentes apropiadas.

---

**¿Tienes preguntas?** ¡No dudes en abrir un issue o iniciar una discusión! Estamos aquí para ayudar a hacer la democracia más accesible y transparente. 🇵🇪

---

## English

Capibarismo provides an interactive platform for comparing political candidates using modern visualization tools and detailed analysis. Built with React and TypeScript, it features a unique retro gaming aesthetic while delivering serious political insights.

> 🇵🇪 **Open Source Community Project**: This project is developed by volunteers committed to promoting democratic transparency in Peru through technology. All contributions are welcome!
> 
> 🗳️ **Facts Protocol**: This project follows a secure fact protocol to verify truthfulness. Every fact can be traced back to their original source with time stamps.
> 
> ⚖️ **Disclaimer**: This is an independent, non-partisan information platform. We strive for accuracy and neutrality, presenting verifiable facts from public sources. All information should be independently verified. We are not affiliated with any political party or candidate.

### ✨ Key Features:

- **🔄 Candidate Comparison**: Side-by-side analysis of political positions with evidence-backed sources
- **🧭 Political Compass**: Interactive visualization positioning candidates on economic and social axes  
- **👤 Detailed Profiles**: Comprehensive candidate information including biography, trajectory, and beliefs
- **🎯 Smart Filtering**: Dynamic filtering and personalized comparisons
- **📱 Responsive Design**: Optimized for mobile and desktop with 90s gaming theme
- **♿ Accessibility**: Built with accessibility-first design principles

### 🎮 UX Philosophy

We treat this civic tool like a fighting game. To maintain "Game Feel", we adhere to strict performance contracts:

- **🥊 "The Punch" (Immediate Feedback)**: <100ms response. Voting feels visceral and instant.
- **🌊 "The Flow" (Sustained Rhythm)**: <1.0s transitions. Users stay in a "voting trance" without interruption.
- **📡 "The Reach" (Digital Inclusion)**: Optimized for all Peru (3G/High Latency). Democracy is for all.

### 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand + TanStack Query
- **Routing**: React Router + Lazy Loading
- **Icons**: Lucide React + React Icons
- **Theme**: 90s Fighting Game Aesthetic

### 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/SanGoku95/presidential-punch-peru.git
cd presidential-punch-peru
npm install

# Set up environment variables (optional for basic development)
cp .env.example .env.local
# Edit .env.local with your values (see ENVIRONMENT.md for details)

# Start development server
npm run dev
# → http://localhost:8080
```

**First time setup?** See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed configuration guide.

### 📋 Available Scripts

- `npm run dev` - Development server with HMR
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Code linting
- `npm run loadtest:smoke` - Quick smoke test (5 users, 1 min)
- `npm run loadtest:baseline` - Baseline performance test (10-50 users, 5 min)

### 🔧 Troubleshooting

**Build fails or dependencies won't install:**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Environment variable issues:**
- See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed setup
- Make sure `.env.local` exists (copy from `.env.example`)
- Restart dev server after changing `VITE_*` variables

**API routes not working:**
- Check that `BLOB_READ_WRITE_TOKEN` is set in `.env.local`
- API routes require Vercel Blob Storage in production

**Analytics not tracking:**
- PostHog requires `VITE_POSTHOG_KEY` in environment
- Analytics are optional and will gracefully disable if not configured

**Port already in use:**
```bash
# Use a different port
npm run dev -- --port 3000
```

For more help, check existing [issues](https://github.com/SanGoku95/presidential-punch-peru/issues) or open a new one.

### 📖 Documentation

- **[Developer Guide](./dev.md)** - Comprehensive technical documentation
- **[Environment Setup](./ENVIRONMENT.md)** - Environment variables configuration guide
- **[Component Architecture](./dev.md#component-architecture)** - UI component organization
- **[Design System](./dev.md#design-system--theme)** - 90s gaming theme details
- **[Load Testing Plan](./docs/load-testing.md)** - Load testing strategy and procedures
- **[Security Policy](./SECURITY.md)** - Vulnerability reporting and security guidelines
- **[License & Attributions](./NOTICE)** - Third-party licenses and acknowledgments

### 🤝 Contributing

We welcome contributions from the community! This is an open source project that benefits from diverse perspectives and expertise.

**Quick Start for Contributors:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Important Guidelines:**
- 📋 Read our [Contributing Guide](CONTRIBUTING.md) for detailed instructions
- 🛡️ Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
- 🗳️ Follow the **Facts Protocol** for all data contributions
- 📚 All data must be **traceable to primary sources**
- ✅ Test your changes locally before submitting

**Ways to Contribute:**
- 🐛 Report bugs or suggest features via [Issues](https://github.com/SanGoku95/presidential-punch-peru/issues)
- 📊 Help verify and update candidate data
- 🌐 Improve translations (Spanish/English)
- 💻 Contribute code improvements
- 📖 Enhance documentation

## 👥 Built by

Built by [@SanGoku95](https://github.com/SanGoku95), [@ditodamaster](https://github.com/ditodamaster), and [@crafter-station/maintainers](https://github.com/orgs/crafter-station/teams/maintainers)

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE) - see the LICENSE file for details.

## 🙏 Acknowledgments  

- Candidate information based on publicly available, verifiable sources
- Inspired by the need for democratic transparency in Peru

---

**Questions?** Don't hesitate to open an issue or start a discussion! We're here to help make democracy more accessible and transparent. 🇵🇪

Web moderna para informar sobre los distintos candidatos, sus posiciones políticas, propuestas, y trajectorias.

> 🗳️ **Protocolo de Hechos**: Este proyecto sigue un protocolo riguroso de hechos verificables. Cada dato es rastreable hasta fuentes primarias y se presenta con marcas de tiempo, contexto y procedimientos de verificación.
> 
> ⚖️ **Descargo de Responsabilidad**: Esta es una plataforma de información independiente y no partidista. Nos esforzamos por la precisión y neutralidad, presentando hechos verificables de fuentes públicas. Toda la información debe ser verificada de forma independiente. No estamos afiliados a ningún partido político ni candidato.

### ✨ Características Principales

*   **🗳️ Comparación**: Compara posturas de candidatos lado a lado con evidencia respaldada por fuentes
*   **🧭 Brújula Política**: Visualización interactiva que posiciona candidatos en los ejes económico y social
*   **👤 Perfiles Detallados**: Información completa de cada candidato con biografía, trayectoria y creencias
*   **🔍 Filtros Dinámicos**: Filtra y personaliza las comparaciones por candidatos de interés
*   **📱 Diseño Responsivo**: Interfaz optimizada para móviles y escritorio con tema de videojuegos de los 90s
*   **♿ Accesibilidad**: Construido con principios de diseño centrados en accesibilidad

### 🎮 Filosofía UX

Tratamos esta herramienta cívica como un videojuego de pelea. Para mantener el "Game Feel", nos adherimos a contratos estrictos de rendimiento:

*   **🥊 "The Punch" (Feedback Inmediato)**: Respuesta <100ms. Votar se siente visceral e instantáneo.
*   **🌊 "The Flow" (Ritmo Sostenido)**: Transiciones <1.0s. Los usuarios permanecen en la zona sin interrupciones.
*   **📡 "The Reach" (Inclusión Digital)**: Optimizado para el Perú Rural (3G/Alta Latencia). La democracia es para todos.

### 🛠️ Stack Tecnológico

*   **Framework:** React 18 con Vite + TypeScript
*   **Componentes UI:** shadcn/ui + Tailwind CSS
*   **Estado:** Zustand + TanStack Query
*   **Navegación:** React Router con carga lazy
*   **Iconos:** Lucide React + React Icons
*   **Tema:** Estética de videojuegos de lucha de los 90s

### 🚀 Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/SanGoku95/presidential-punch-peru.git
cd presidential-punch-peru
npm install

# Iniciar servidor de desarrollo
npm run dev
# → http://localhost:8080
```

### 📋 Scripts Disponibles

*   `npm run dev` - Servidor de desarrollo con HMR
*   `npm run build` - Compilación para producción
*   `npm run preview` - Previsualizar build de producción
*   `npm run lint` - Análisis de código con ESLint
*   `npm run loadtest:smoke` - Prueba rápida de humo (5 usuarios, 1 min)
*   `npm run loadtest:baseline` - Prueba de rendimiento base (10-50 usuarios, 5 min)

### 📖 Documentación

- **[Guía de Desarrollo](./dev.md)** - Documentación técnica completa
- **[Arquitectura de Componentes](./dev.md#component-architecture)** - Organización de componentes UI
- **[Sistema de Diseño](./dev.md#design-system--theme)** - Detalles del tema gaming de los 90s
- **[Plan de Pruebas de Carga](./docs/load-testing.md)** - Estrategia y procedimientos de pruebas de carga

### 🤝 Contribución

¡Damos la bienvenida a contribuciones de la comunidad! Este es un proyecto de código abierto que se beneficia de perspectivas y experiencia diversas.

**Inicio Rápido para Contribuidores:**
1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

**Pautas Importantes:**
- 📋 Lee nuestra [Guía de Contribución](CONTRIBUTING.md) para instrucciones detalladas
- 🛡️ Sigue nuestro [Código de Conducta](CODE_OF_CONDUCT.md)
- 🗳️ Sigue el **Protocolo de Hechos** para todas las contribuciones de datos
- 📚 Todos los datos deben ser **rastreables hasta fuentes primarias**
- ✅ Prueba tus cambios localmente antes de enviar

**Formas de Contribuir:**
- 🐛 Reportar bugs o sugerir características vía [Issues](https://github.com/SanGoku95/presidential-punch-peru/issues)
- 📊 Ayudar a verificar y actualizar datos de candidatos
- 🌐 Mejorar traducciones (Español/Inglés)
- 💻 Contribuir mejoras de código
- 📖 Mejorar documentación

## 👥 Construido por

Construido por [@SanGoku95](https://github.com/SanGoku95), [@ditodamaster](https://github.com/ditodamaster), y [@crafter-station/maintainers](https://github.com/orgs/crafter-station/teams/maintainers)

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Reconocimientos

- Gracias a todos los [contribuidores](https://github.com/SanGoku95/presidential-punch-peru/contributors) que han ayudado a hacer este proyecto posible
- Información de candidatos basada en fuentes públicas y verificables
- Inspirado en la necesidad de transparencia democrática en el Perú

## 📞 Contacto & Comunidad

- 🐛 **Issues**: [GitHub Issues](https://github.com/SanGoku95/presidential-punch-peru/issues)
- 💬 **Discusiones**: [GitHub Discussions](https://github.com/SanGoku95/presidential-punch-peru/discussions)

### 🗂️ Datos & Fuentes

Toda la información de candidatos en este proyecto proviene de fuentes verificables y públicas. Mantenemos:
- **Precisión factual** con atribución adecuada de fuentes
- **Protocolo de hechos** siguiendo estándares rigurosos de verificabilidad
- **Transparencia** en nuestros métodos de recolección de datos
- **Actualizaciones regulares** para mantener la información actualizada

Si encuentras información inexacta, por favor [abre un issue de datos](https://github.com/SanGoku95/presidential-punch-peru/issues/new?template=data_update.md) con fuentes apropiadas.

---

**¿Tienes preguntas?** ¡No dudes en abrir un issue o iniciar una discusión! Estamos aquí para ayudar a hacer la democracia más accesible y transparente. 🇵🇪
