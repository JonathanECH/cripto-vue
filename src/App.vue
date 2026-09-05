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

      <Cotizacion v-if="mostrarResultado" 
      :cotizar="cotizar"
      :resultadoCotizacion="resultadoCotizacion"
      :criptoActual="criptoActual"
      :formatearFecha="formatearFecha"/>
      <!--Cotizacion.vue-->
      <Spinner v-if="cargando" />
      <!--Spinner.vue-->
    </div>
  </section>
</template>