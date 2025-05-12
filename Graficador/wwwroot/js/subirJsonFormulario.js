document.addEventListener('DOMContentLoaded', function () {
    const categoriaGrafico = document.getElementById('categoriaGrafico');
    const tipoGraficoSelect = document.getElementById('tipoGrafico');

    const tiposGraficos = {
        barras: ['bar', 'barrasHorizontales', 'barrasApiladas', 'barrasApiladasGrupos', 'barrasBordeRedondeado'],
        lineas: ['line', 'lineaInterpolacion', 'lineaEstiloPuntos', 'lineaEstiloSegmento', 'lineaEscalonada'],
        escalas: ['escalaLinealMinMax', 'escalaLinealMinMaxSugerido', 'escalaLinealPaso', 'escalaLogaritmica'],
        otros: ['doughnut', 'radar', 'comboBarLinea', 'barraLinealApilada']
    };

    categoriaGrafico.addEventListener('change', function () {
        const categoriaSeleccionada = this.value;
        tipoGraficoSelect.innerHTML = '<option value="">Seleccionar Tipo</option>';

        if (tiposGraficos[categoriaSeleccionada]) {
            tiposGraficos[categoriaSeleccionada].forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo;
                option.textContent = tipo.replace(/([A-Z])/g, ' $1').trim();
                tipoGraficoSelect.appendChild(option);
            });
        }
    });

    // Inicializar el formulario al cargar
    categoriaGrafico.value = '';
    categoriaGrafico.dispatchEvent(new Event('change'));
});
