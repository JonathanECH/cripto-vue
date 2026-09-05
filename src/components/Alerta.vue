<script setup>
import { computed } from 'vue'

const props = defineProps({
    tipo: {
        type: String,
        default: 'error',
        validator: (value) => ['error', 'warning', 'success', 'info'].includes(value)
    }
})

// Mapeo de estilos según la propiedad "tipo"
const clasesTipo = computed(() => {
    const estilos = {
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-amber-100 border-amber-500 text-amber-800',
        success: 'bg-emerald-100 border-emerald-500 text-emerald-800',
        info: 'bg-sky-100 border-sky-500 text-sky-800'
    }
    return estilos[props.tipo] || estilos.error
})
</script>

<template>
    <div :class="['border-l-4 p-4 rounded shadow-sm text-2xl font-medium my-3', clasesTipo]">
        <slot></slot>
    </div>
</template>