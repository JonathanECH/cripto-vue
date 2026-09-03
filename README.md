# 💰 Cotizador de Criptomonedas

Aplicación web para consultar el precio actual de las principales criptomonedas en distintas monedas. El usuario puede seleccionar una moneda, elegir una criptomoneda y obtener una cotización con información adicional del mercado.

## 🌐 Demo

Prueba la aplicación publicada en Vercel:

**[Abrir demo en vivo](https://cripto-vue-chi.vercel.app/)**

La demo carga las criptomonedas disponibles desde la API de CoinGecko y permite realizar cotizaciones directamente desde el navegador.

## 📊 Funcionalidades

- Carga las 20 criptomonedas principales ordenadas por capitalización de mercado.
- Permite seleccionar monedas como USD, EUR, GBP, MXN y otras.
- Consulta el precio de una criptomoneda en la moneda seleccionada.
- Muestra el precio actual, el máximo y el mínimo del día.
- Muestra la variación porcentual de las últimas 24 horas.
- Indica la fecha y hora de la última actualización.
- Incluye mensajes de validación, éxito y error.

## 🧰 Herramientas utilizadas

- **Vue 3**: framework para construir la interfaz y gestionar el estado de la aplicación.
- **Vite**: herramienta de desarrollo y empaquetado del proyecto.
- **Tailwind CSS 4**: estilos de la interfaz mediante clases utilitarias.
- **@tailwindcss/vite**: integración de Tailwind CSS con Vite.
- **CoinGecko API**: fuente de los datos de criptomonedas y cotizaciones.
- **pnpm**: gestor de paquetes utilizado para instalar dependencias y ejecutar scripts.
- **Vercel**: plataforma utilizada para publicar la demo.

## 📋 Requisitos

- Node.js 18 o superior.
- pnpm instalado globalmente.

Puedes instalar pnpm con:

```bash
npm install --global pnpm
```

## 💻 Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd cripto-vue
```

Instala las dependencias:

```bash
pnpm install
```

## ⚡ Ejecución en desarrollo

Inicia el servidor local:

```bash
pnpm dev
```

Después, abre en el navegador la URL que muestre Vite, normalmente `http://localhost:5173`.

## 🏗️ Build de producción

Genera los archivos optimizados para producción:

```bash
pnpm build
```

Para previsualizar localmente el build generado:

```bash
pnpm preview
```

## 📡 API utilizada

El proyecto utiliza los siguientes endpoints públicos de CoinGecko:

- `GET /api/v3/coins/markets`: obtiene las principales criptomonedas.
- `GET /api/v3/simple/price`: obtiene la cotización y la variación de 24 horas.

La aplicación no necesita variables de entorno para funcionar en desarrollo.
