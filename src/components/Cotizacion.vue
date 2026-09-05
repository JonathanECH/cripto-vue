<script setup>
defineProps({
    cotizar:{
        type: Object,
        required: true
    },
    resultadoCotizacion: {
        type: [Number, null],
        required: true
    },
    criptoActual: {
        type: Object,
        required: true
    },
    formatearFecha: Function
});
</script>

<template lang="">
<article>
    <h2 class="my-8 text-center text-[2.6rem] font-black">Cotización</h2>
    <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
        <img class="w-[80%] justify-self-center" :src="criptoActual.image" alt="imagen criptomoneda">
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
</template>