<script setup>
import { ref, onMounted, reactive } from 'vue';
import Alerta from './components/Alerta.vue'
const monedas = ref([
  { codigo: 'USD', texto: 'Dólar de Estados Unidos' },
  { codigo: 'EUR', texto: 'Euro' },
  { codigo: 'GBP', texto: 'Libra Esterlina' },
  { codigo: 'MXN', texto: 'Peso Mexicano' },
  { codigo: 'JPY', texto: 'Yen Japonés' },
  { codigo: 'CAD', texto: 'Dólar Canadiense' },
  { codigo: 'AUD', texto: 'Dólar Australiano' },
  { codigo: 'BRL', texto: 'Real Brasileño' },
  { codigo: 'ARS', texto: 'Peso Argentino' },
  { codigo: 'COP', texto: 'Peso Colombiano' },
  { codigo: 'CLP', texto: 'Peso Chileno' },
  { codigo: 'PEN', texto: 'Sol Peruano' },
  { codigo: 'CHF', texto: 'Franco Suizo' },
  { codigo: 'CNY', texto: 'Yuan Chino' },
])
const criptomonedas = ref([])

const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})
const mensaje = ref('')
const tipoMensaje = ref('error') // 'error' | 'warning' | 'success' | 'info'

onMounted(() => {
  const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD&api_key=4e559f31bd2377fe58a94eeb2b057f9478c4cdb86478c824746edcefbcf34007'
  fetch(url)
    .then(res => res.json())
    .then(({ Data }) => {
      Data.LIST.forEach(cripto => {
        criptomonedas.value.push(cripto)
      })
    })
})

const cotizarCripto = () => {
  // Validamos que esten los campos vacios
  if (Object.values(cotizar).includes('')) {
    tipoMensaje.value = 'warning'
    mensaje.value = 'Todos los campos son obligatorios'
    setTimeout(() => {
      tipoMensaje.value = ''
      mensaje.value = ''
    }, 4000);
    return;
  }
  //Si todo esta bien se deja pasar
}
</script>

<template>
  <section class="contenedor">
    <h1 class="titulo">Cotizador de
      <span>Criptomonedas</span>
    </h1>

    <div class="contenido">
      <form class="formulario" @submit.prevent="cotizarCripto">
        <!-- Renderizado condicional de la alerta -->
        <Alerta v-if="mensaje" :tipo="tipoMensaje">
          {{ mensaje }}
        </Alerta>
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="" selected disabled>-- Seleccionar --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="" selected disabled>-- Seleccionar --</option>
            <option v-for="cripto in criptomonedas" :value="cripto.SYMBOL">{{ cripto.NAME }}</option>
          </select>
        </div>

        <input type="submit" value="cotizar">
      </form>
    </div>
  </section>
</template>
