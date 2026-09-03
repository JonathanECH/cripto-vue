<script setup>
import { ref, onMounted } from 'vue';
const monedas = ref([
  { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
  { codigo: 'MXN', texto: 'Peso Mexicano' },
  { codigo: 'EUR', texto: 'Euro' },
  { codigo: 'GBP', texto: 'Libra Esterlina' },
])
const criptomonedas = ref([])
onMounted(() => {
  const url = 'https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD&api_key=4e559f31bd2377fe58a94eeb2b057f9478c4cdb86478c824746edcefbcf34007'
  fetch(url)
    .then(res => res.json())
    .then(({ Data }) => criptomonedas.value = Data)
})
</script>

<template>
  <section class="contenedor">
    <h1 class="titulo">Cotizador de
      <span>Criptomonedas</span>
    </h1>

    <div class="contenido">
      <form class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select id="moneda">
            <option value="" selected disabled>-- Seleccionar --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select id="cripto">
            <option value="" selected disabled>-- Seleccionar --</option>
            <option v-for="cripto in criptomonedas" :value="cripto.SYMBOL">{{ cripto }}</option>
          </select>
        </div>
      </form>
    </div>
  </section>
</template>
