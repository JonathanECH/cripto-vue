<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import Alerta from './components/Alerta.vue';

const monedas = ref([
  { codigo: 'usd', texto: 'Dólar de Estados Unidos' },
  { codigo: 'eur', texto: 'Euro' },
  { codigo: 'gbp', texto: 'Libra Esterlina' },
  { codigo: 'mxn', texto: 'Peso Mexicano' },
  { codigo: 'jpy', texto: 'Yen Japonés' },
  { codigo: 'cad', texto: 'Dólar Canadiense' },
  { codigo: 'aud', texto: 'Dólar Australiano' },
  { codigo: 'brl', texto: 'Real Brasileño' },
  { codigo: 'ars', texto: 'Peso Argentino' },
  { codigo: 'cop', texto: 'Peso Colombiano' },
  { codigo: 'clp', texto: 'Peso Chileno' },
  { codigo: 'pen', texto: 'Sol Peruano' },
  { codigo: 'chf', texto: 'Franco Suizo' },
  { codigo: 'cny', texto: 'Yuan Chino' },
]);

const criptomonedas = ref([]);
const resultadoCotizacion = ref(null);
const criptoActual = ref(null);
const cotizar = reactive({
  moneda: '',
  criptomoneda: '' // Guardará el 'id' de la criptomoneda (ej: 'bitcoin')
});

const mensaje = ref('');
const tipoMensaje = ref('error');

onMounted(async () => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al cargar top de criptomonedas');
    criptomonedas.value = await res.json();
  } catch (error) {
    tipoMensaje.value = 'error';
    mensaje.value = 'No se pudo cargar la lista de criptomonedas.';
  }
});

const cotizarCripto = () => {
  if (Object.values(cotizar).includes('')) {
    tipoMensaje.value = 'warning';
    mensaje.value = 'Todos los campos son obligatorios';
    setTimeout(() => {
      tipoMensaje.value = '';
      mensaje.value = '';
    }, 4000);
    return;
  }
  obtenerCotiza();
};

const obtenerCotiza = async () => {
  const { moneda, criptomoneda } = cotizar;
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${criptomoneda}&vs_currencies=${moneda}&include_24hr_change=true`;

  try {
    mensaje.value = '';
    const res = await fetch(url);
    criptoActual.value = criptomonedas.value.find(c => c.id === cotizar.criptomoneda) || null;
    if (!res.ok) throw new Error('Error en la cotización');

    const data = await res.json();
    resultadoCotizacion.value = data[criptomoneda][moneda];
    tipoMensaje.value = 'success';
    mensaje.value = 'Cotización obtenida con éxito';
    setTimeout(() => {
      tipoMensaje.value = '';
      mensaje.value = '';
    }, 4000);
  } catch (err) {
    tipoMensaje.value = 'error';
    mensaje.value = 'Error al consultar la API. Intenta de nuevo en unos segundos.';
    setTimeout(() => {
      tipoMensaje.value = '';
      mensaje.value = '';
    }, 4000);
  }
};
</script>

<template>
  <section class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

    <div class="contenido">
      <form class="formulario" @submit.prevent="cotizarCripto">
        <Alerta v-if="mensaje" :tipo="tipoMensaje">
          {{ mensaje }}
        </Alerta>

        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="" disabled>-- Seleccionar --</option>
            <option v-for="m in monedas" :key="m.codigo" :value="m.codigo">
              {{ m.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="" disabled>-- Seleccionar --</option>
            <option v-for="cripto in criptomonedas" :key="cripto.id" :value="cripto.id">
              {{ cripto.name }} ({{ cripto.symbol.toUpperCase() }})
            </option>
          </select>
        </div>

        <input type="submit" value="Cotizar" />
      </form>

      <article v-if="criptoActual && resultadoCotizacion" class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
          <img :src="criptoActual.image" alt="imagen criptomoneda">
          <div>
            <p>El precio es de: <span>{{ resultadoCotizacion }} {{ cotizar.moneda.toUpperCase() }}</span></p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>