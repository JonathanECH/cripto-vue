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

const formatearFecha = (fechaIso) => {
  if (!fechaIso) return '';
  const fecha = new Date(fechaIso);
  return fecha.toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
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
    }, 3000);
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
    if (!res.ok) throw new Error('Error en la cotización');

    const data = await res.json();
    resultadoCotizacion.value = data[criptomoneda][moneda];
    criptoActual.value = criptomonedas.value.find(c => c.id === cotizar.criptomoneda) || null;

    tipoMensaje.value = 'success';
    mensaje.value = 'Cotización obtenida con éxito';
    setTimeout(() => {
      tipoMensaje.value = '';
      mensaje.value = '';
    }, 3000);
  } catch (err) {
    tipoMensaje.value = 'error';
    mensaje.value = 'Error al consultar la API. Intenta de nuevo en unos segundos.';
    setTimeout(() => {
      tipoMensaje.value = '';
      mensaje.value = '';
    }, 3000);
  }
};
</script>

<template>
  <section class="mx-auto w-[95%] max-w-[80rem]">
    <h1 class="mt-[5rem] text-[3.8rem] leading-[.8] text-white">
      Cotizador de <span class="block text-[4.4rem] text-[#61ecbc]">Criptomonedas</span>
    </h1>

    <div
      class="mt-[5rem] max-w-[50rem] max-h-[70vh] lg:max-h-[80vh] overflow-y-auto rounded-[1rem] bg-white px-[2rem] pb-[3rem] pt-[4rem] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <form class="flex flex-col gap-8" @submit.prevent="cotizarCripto">
        <Alerta v-if="mensaje" :tipo="tipoMensaje">
          {{ mensaje }}
        </Alerta>

        <div class="flex flex-col gap-8">
          <label class="text-[#182339]" for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda"
            class="cursor-pointer rounded-[1rem] border-0 bg-[#ecebeb] p-4 text-[1.8rem]">
            <option value="" disabled>-- Seleccionar --</option>
            <option v-for="m in monedas" :key="m.codigo" :value="m.codigo">
              {{ m.texto }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-8">
          <label class="text-[#182339]" for="cripto">Criptomoneda:</label>
          <select id="cripto" v-model="cotizar.criptomoneda"
            class="cursor-pointer rounded-[1rem] border-0 bg-[#ecebeb] p-4 text-[1.8rem]">
            <option value="" disabled>-- Seleccionar --</option>
            <option v-for="cripto in criptomonedas" :key="cripto.id" :value="cripto.id">
              {{ cripto.name }} ({{ cripto.symbol.toUpperCase() }})
            </option>
          </select>
        </div>

        <input
          class="mt-8 cursor-pointer border-0 bg-[#61ecbc] p-4 text-[18px] font-black uppercase text-[#182339] transition-colors duration-300 hover:bg-[#0cb387]"
          type="submit" value="Cotizar" />
      </form>

      <article v-if="criptoActual && resultadoCotizacion">
        <h2 class="my-8 text-center text-[2.6rem] font-black">Cotización</h2>
        <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
          <img class="w-[60%] justify-self-center" :src="criptoActual.image" alt="imagen criptomoneda">
          <div>
            <p class="mb-4 text-[1.6rem]">El precio es de: <span class="font-bold">{{ resultadoCotizacion }} {{
              cotizar.moneda.toUpperCase() }}</span></p>
            <p class="mb-4 text-[1.6rem]">Precio más alto del día: <span class="font-bold">{{ criptoActual.high_24h }}
                {{ cotizar.moneda.toUpperCase() }}</span></p>
            <p class="mb-4 text-[1.6rem]">Precio más bajo del día: <span class="font-bold">{{ criptoActual.low_24h }} {{
              cotizar.moneda.toUpperCase() }}</span></p>
            <p class="mb-4 text-[1.6rem]">
              Variación 24h:
              <span
                :class="criptoActual.price_change_percentage_24h >= 0 ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'">
                {{ criptoActual.price_change_percentage_24h.toFixed(2) }}%
              </span>
            </p>
            <p class="mb-4 text-[1.6rem]">
              Última actualización:
              <span class="font-bold">
                {{ formatearFecha(criptoActual.last_updated) }}
              </span>
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>