<script setup>
import { reactive } from 'vue';
import Cotizacion from './components/Cotizacion.vue';
import Alerta from './components/Alerta.vue';
import Spinner from './components/Spinner.vue';
import useCripto from './composables/useCripto.js';

const { monedas, criptomonedas, resultadoCotizacion, criptoActual, cargando, mensaje, tipoMensaje, obtenerCotiza, formatearFecha, mostrarResultado } = useCripto();

const cotizar = reactive({
  moneda: '',
  criptomoneda: '' // Guardará el 'id' de la criptomoneda (ej: 'bitcoin')
});

//Valida que los todos los campos <select> esten llenados
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
  obtenerCotiza(cotizar);
};
</script>

<template>
  <section class="mx-auto w-[95%] max-w-[80rem]">
    <h1 class="mt-[5rem] text-[3.8rem] leading-[.8] text-white">
      Cotizador de <span class="block text-[4.4rem] text-[#61ecbc]">Criptomonedas</span>
    </h1>

    <div
      class="mt-[5rem] max-w-[50rem] max-h-[70vh] overflow-y-auto rounded-[1rem] bg-white px-[2rem] pb-[3rem] pt-[4rem] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <form class="flex flex-col gap-8" @submit.prevent="cotizarCripto">
        <Alerta v-if="mensaje" :tipo="tipoMensaje">
          {{ mensaje }}
        </Alerta>
        <!--Alerta.vue-->

        <div class="flex flex-col gap-2">
          <label class="font-bold text-[#182339]" for="moneda">Moneda:</label>
          <div class="relative w-full">
            <select id="moneda" v-model="cotizar.moneda"
              class="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#ecebeb] py-3.5 pl-4 pr-10 text-[1.8rem] font-medium text-gray-800 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option value="" disabled>-- Seleccionar --</option>
              <option v-for="m in monedas" :key="m.codigo" :value="m.codigo">
                {{ m.texto }}
              </option>
            </select>

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
              <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-bold text-[#182339]" for="cripto">Criptomoneda:</label>
          <div class="relative w-full">
            <select id="cripto" v-model="cotizar.criptomoneda"
              class="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-[#ecebeb] py-3.5 pl-4 pr-10 text-[1.8rem] font-medium text-gray-800 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
              <option value="" disabled>-- Seleccionar --</option>
              <option v-for="cripto in criptomonedas" :key="cripto.id" :value="cripto.id">
                {{ cripto.name }} ({{ cripto.symbol.toUpperCase() }})
              </option>
            </select>

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
              <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <input
          class="mt-8 cursor-pointer border-0 bg-[#61ecbc] p-4 text-[18px] font-black uppercase text-[#182339] transition-colors duration-300 hover:bg-[#0cb387]"
          type="submit" value="Cotizar" />
      </form>

      <Cotizacion v-if="mostrarResultado" :cotizar="cotizar" :resultadoCotizacion="resultadoCotizacion"
        :criptoActual="criptoActual" :formatearFecha="formatearFecha" />
      <!--Cotizacion.vue-->
      <Spinner v-if="cargando" />
      <!--Spinner.vue-->
    </div>
  </section>
</template>