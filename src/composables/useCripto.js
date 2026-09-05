import { ref, onMounted, computed } from "vue";
export default function useCripto() {
    const criptomonedas = ref([]);
    const resultadoCotizacion = ref(null);
    const criptoActual = ref(null);
    const cargando = ref(false);

    const mensaje = ref('');
    const tipoMensaje = ref('error');

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
        { codigo: 'clp', texto: 'Peso Chileno' },
        { codigo: 'chf', texto: 'Franco Suizo' },
        { codigo: 'cny', texto: 'Yuan Chino' },
    ]);

    onMounted(async () => {
        try {
            const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error al cargar top de criptomonedas');
            criptomonedas.value = await res.json();
        } catch (error) {
            tipoMensaje.value = 'error';
            mensaje.value = 'No se pudo cargar la lista de criptomonedas.';
        }
    });

    //Para obtener la cotización
    const obtenerCotiza = async (cotizar) => {
        cargando.value = true;
        resultadoCotizacion.value = null;

        try {
            const { moneda, criptomoneda } = cotizar;
            const url = `https://api.coingecko.com/api/v3/simple/price?ids=${criptomoneda}&vs_currencies=${moneda}&include_24hr_change=true`;

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
        finally {
            cargando.value = false;
        }
    };

    //Para mostrar la fecha de la ultima actualización
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

    //Para mostrar el resultado y manejar la animación del spinner
    const mostrarResultado = computed(() => {
        return typeof resultadoCotizacion.value === 'number' && resultadoCotizacion.value !== null;
    })

    return {
        monedas, criptomonedas, resultadoCotizacion, criptoActual, cargando, mensaje, tipoMensaje, obtenerCotiza, formatearFecha, mostrarResultado
    }
}