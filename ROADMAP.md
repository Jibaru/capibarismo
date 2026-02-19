# Roadmap de Capibarismo

> **Filosofía principal:** Dar información verificada y bajar la carga cognitiva de la decisión del voto.

---

## Estado de las ideas

| # | Feature | Área | Complejidad |
|---|---------|------|-------------|
| 1 | [Ranking Compartible](#1-ranking-compartible) | Social / Gamificación | Media |
| 2 | [Explorar Senadores](#2-explorar-senadores) | Datos / Nueva sección | Alta |
| 3 | [Información de Vicepresidentes](#3-información-de-vicepresidentes) | Datos / Perfil | Baja |
| 4 | [Explorar Diputados](#4-explorar-diputados) | Datos / Nueva sección | Alta |
| 5 | [Ampliar Controversias](#5-ampliar-controversias) | Datos / Perfil | Media |
| 6 | [Datos de Polymarket](#6-datos-de-polymarket) | Datos externos | Media |
| 7 | [Encuestas del último mes](#7-encuestas-del-último-mes) | Datos externos | Baja |
| 8 | [Animaciones de Ataques Especiales](#8-animaciones-de-ataques-especiales) | UX / Gamificación | Muy Alta |
| 9 | [Usuario en el Mapa Político + Compartir](#9-usuario-en-el-mapa-político--compartir) | UX / Interactividad | Alta |
| 10 | [Ranking Global](#10-ranking-global) | Backend / Social | Alta |
| 11 | [Acerca en el Mapa Político](#11-acerca-en-el-mapa-político) | UX / Contenido | Muy Baja |
| 12 | [Datos del Mapa Político para todos los candidatos](#12-datos-del-mapa-político-para-todos-los-candidatos) | Datos | Baja |
| 13 | [Ideología de todos los candidatos](#13-ideología-de-todos-los-candidatos) | Datos | Baja |

---

## Detalle de cada idea

### 1. Ranking Compartible

**Objetivo:** Motivar al usuario a compartir su ranking personal al terminar el torneo electoral.

**Descripción:**
Al llegar al podio final, mostrar un botón "Compartir mi ranking" que genere una imagen/tarjeta con el top 3 del usuario, lista para compartir en redes sociales (WhatsApp, X, Instagram Stories).

**Ideas de implementación:**
- Generar imagen con `html-to-image` o `canvas` a partir del componente `PodiumScreen`.
- Web Share API para compartir nativamente en móvil.
- URL pública con los resultados codificados en query params para compartir sin backend.

---

### 2. Explorar Senadores

**Objetivo:** Ayudar al usuario a decidir su partido para el Senado.

**Descripción:**
Nueva sección `/senado` con tarjetas de los principales candidatos al Senado agrupados por partido. Permitir filtrar por partido, región y postura política.

**Ideas de implementación:**
- Nueva página `SenadoPage.tsx`.
- Nuevo dominio de datos `senadores.ts` con estructura similar a `base.ts`.
- Datos obtenidos del JNE (listas oficiales de candidatos al Congreso).
- Vista de lista con filtros por partido.

---

### 3. Información de Vicepresidentes

**Objetivo:** Mostrar quién es el vicepresidente (1° y 2°) de cada candidato presidencial.

**Descripción:**
Agregar los nombres del primer y segundo vicepresidente al perfil de cada candidato. Mostrarlos en la tarjeta de perfil y en la pantalla de comparación.

**Ideas de implementación:**
- Agregar campos `primerVicepresidente` y `segundoVicepresidente` a `CandidateBase` en `types.ts`.
- Completar datos en `base.ts` usando las listas del JNE.
- Mostrar en `CandidateProfile.tsx` y en `ComparePanelDesktop.tsx`.

---

### 4. Explorar Diputados

**Objetivo:** Ayudar al usuario a decidir su partido para la Cámara de Diputados.

**Descripción:**
Nueva sección `/diputados` con vista exploratoria de listas de diputados por partido y circunscripción. Similar a la sección de Senadores.

**Ideas de implementación:**
- Nueva página `DiputadosPage.tsx`.
- Nuevo dominio de datos `diputados.ts`.
- Datos del JNE.
- Posibilidad de mostrar los top candidatos de cada lista por partido.

---

### 5. Ampliar Controversias

**Objetivo:** Mostrar al usuario las controversias más importantes de cada candidato de forma clara y verificada.

**Descripción:**
Agregar una sección de "Controversias" al perfil de cada candidato y a la pantalla de comparación. Cada controversia debe tener: título, descripción, fuente verificable, severidad (muy alta / alta / media) y estado legal (denuncia en medios / en curso / sanción / condena / cerrado).

**Ideas de implementación:**
- Agregar tipo `Controversia` a `types.ts`.
- Crear `src/data/domains/controversias.ts` con datos de cada candidato (hay datos de arranque en `src/data/domains/archive/controversias.ts`).
- Exportar desde `src/data/index.ts`.
- Agregar sección de controversias en `CandidateProfile.tsx`.
- Agregar acordeón de controversias en `ComparePanelDesktop.tsx`.
- Reutilizar los helpers de `src/components/compare/controversy-utils.ts`.

---

### 6. Datos de Polymarket

**Objetivo:** Mostrar las probabilidades de mercado (Polymarket) para cada candidato como señal adicional de información.

**Descripción:**
Mostrar en el perfil o en la página principal la probabilidad implícita de ganar la presidencia según el mercado de predicciones Polymarket.

**Ideas de implementación:**
- Consumir la API pública de Polymarket para obtener odds por candidato.
- Mostrar como un widget "Mercado de predicciones" en el perfil del candidato o en la home.
- Actualizar con caché para no generar costos de API.
- Aclarar al usuario que es una probabilidad de mercado, no una encuesta.

---

### 7. Encuestas del último mes

**Objetivo:** Mostrar las encuestas de intención de voto más recientes para cada candidato.

**Descripción:**
Agregar una sección "Encuestas" con las últimas encuestas de intención de voto del mes, indicando la fuente, la fecha y el porcentaje.

**Ideas de implementación:**
- Nuevo tipo `Encuesta` en `types.ts` (fuente, fecha, porcentaje, url).
- Nuevo dominio `src/data/domains/encuestas.ts` con los datos del último mes.
- Fuentes sugeridas: IEP, Ipsos Perú, Datum, CPI.
- Mostrar como gráfico de barras simple o tabla en el perfil del candidato.
- Actualizar manualmente cada semana o automatizar con un script.

---

### 8. Animaciones de Ataques Especiales

**Objetivo:** Completar la experiencia de juego de lucha con ataques especiales únicos por candidato.

**Descripción:**
Cada candidato tendría una animación de "ataque especial" inspirada en su personaje público, que se activa al ganar una ronda en el torneo. Esto es la **Meta Épica** del proyecto (S/ 1,000).

**Ideas de implementación:**
- Animaciones frame-by-frame o Lottie por candidato.
- Integrar en `VSScreen.tsx` al declarar ganador de una ronda.
- Requiere trabajo de diseño/ilustración por candidato.
- Alta inversión de tiempo y recursos.

---

### 9. Usuario en el Mapa Político + Compartir

**Objetivo:** Que el usuario pueda colocarse a sí mismo en el mapa político respondiendo preguntas, y luego compartir su posición.

**Descripción:**
Un cuestionario corto (8–12 preguntas) que calcula la posición del usuario en los 4 ejes del mapa político. Al terminar, el usuario ve su punto en el mapa junto a los candidatos y puede compartir la imagen.

**Ideas de implementación:**
- Nueva página `/mi-brujula` con el cuestionario.
- Las respuestas determinan valores en los 4 ejes (econ, social, territorial, power).
- Mostrar resultado sobre el `PoliticalCompass` existente.
- Guardar posición en localStorage para mostrar en futuras visitas.
- Botón de compartir (imagen o URL con parámetros codificados).

---

### 10. Ranking Global

**Objetivo:** Mostrar un ranking agregado de todos los votos de todos los usuarios.

**Descripción:**
Una página `/ranking-global` que muestre qué candidatos reciben más votos en el torneo a nivel de todos los usuarios de la plataforma.

**Ideas de implementación:**
- Usar el backend existente (`/api/game/vote` y `/api/ranking/personal`).
- Agregar endpoint `GET /api/ranking/global` que agregue todos los votos.
- Mostrar en una página con barra de progreso por candidato.
- Actualizar en tiempo real o con polling cada 30 segundos.

---

### 11. Acerca en el Mapa Político

**Objetivo:** Ayudar al usuario a entender la metodología del mapa político directamente desde esa página.

**Descripción:**
Agregar un enlace o botón "¿Cómo se mide esto?" en `PoliticalCompassPage` que dirija a la sección de metodología de la página `/about`, o mostrar el contenido inline en un modal.

**Ideas de implementación:**
- Agregar un `<Link to="/about#metodologia">` o un `<Popover>` en `PoliticalCompassPage.tsx`.
- Mínimo cambio: un botón con ícono de información en el encabezado de la página del mapa.

---

### 12. Datos del Mapa Político para todos los candidatos

**Objetivo:** Tener posiciones en los 4 ejes del mapa político para los 36 candidatos.

**Descripción:**
Actualmente solo 6 candidatos tienen datos en `compass.ts`. Completar los 30 restantes con datos verificados y documentados.

**Ideas de implementación:**
- Completar `src/data/domains/compass.ts` con los valores de los 36 candidatos.
- Documentar las fuentes en `src/data/candidateSources.ts`.
- Los valores (−10 a +10) deben justificarse con el plan de gobierno y declaraciones públicas.

---

### 13. Ideología de todos los candidatos

**Objetivo:** Mostrar la etiqueta ideológica de cada candidato en su perfil y en la comparación.

**Descripción:**
Todos los candidatos tienen `ideologia: null` en `base.ts`. Completar este campo con una etiqueta concisa y verificada para los 36 candidatos.

**Ideas de implementación:**
- Editar `src/data/domains/base.ts` completando el campo `ideologia` de cada candidato.
- Basarse en sus planes de gobierno, declaraciones públicas y posicionamiento histórico.
- Ejemplos de etiquetas: "Derecha fujimorista", "Izquierda radical", "Centro-derecha liberal".
- Documentar las fuentes en `src/data/candidateSources.ts`.
