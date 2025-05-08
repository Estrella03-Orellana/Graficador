document.addEventListener('DOMContentLoaded', function () {
    const categoriaGrafico = document.getElementById('categoriaGrafico');
    const tipoGraficoSelect = document.getElementById('tipoGrafico');
    const camposDatosDiv = document.getElementById('camposDatos');
    const opcionesGraficoDiv = document.getElementById('opcionesGrafico');

    const tiposGraficos = {
        barras: ['bar', 'barrasHorizontales', 'barrasApiladas', 'barrasApiladasGrupos', 'barrasBordeRedondeado'],
        lineas: ['line', 'lineaInterpolacion', 'lineaEstiloPuntos', 'lineaEstiloSegmento', 'lineaEscalonada'],
        escalas: ['escalaLinealMinMax', 'escalaLinealMinMaxSugerido', 'escalaLinealPaso', 'escalaLogaritmica'],
        otros: ['doughnut', 'radar', 'comboBarLinea', 'barraLinealApilada']
    };

    const etiquetasValoresHTML = `
        <div class="mb-3">
            <label for="etiquetas" class="form-label">Etiquetas (separadas por comas):</label>
            <input type="text" class="form-control" id="etiquetas" name="Etiquetas" required>
        </div>
        <div class="mb-3">
            <label for="valores" class="form-label">Valores (separados por comas):</label>
            <input type="text" class="form-control" id="valores" name="Valores" required>
        </div>
    `;

    categoriaGrafico.addEventListener('change', function () {
        const categoriaSeleccionada = this.value;
        tipoGraficoSelect.innerHTML = '<option value="">Seleccionar Tipo</option>';
        camposDatosDiv.innerHTML = '';
        opcionesGraficoDiv.innerHTML = '';

        if (tiposGraficos[categoriaSeleccionada]) {
            tiposGraficos[categoriaSeleccionada].forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo;
                option.textContent = tipo.replace(/([A-Z])/g, ' $1').trim();
                tipoGraficoSelect.appendChild(option);
            });

            camposDatosDiv.innerHTML = etiquetasValoresHTML;
        }
    });

    tipoGraficoSelect.addEventListener('change', function () {
        const tipoSeleccionado = this.value;
        opcionesGraficoDiv.innerHTML = '';

        if (tipoSeleccionado === 'barrasBordeRedondeado') {
            opcionesGraficoDiv.innerHTML = `
                <div class="mb-3">
                    <label class="form-label">Radio del Borde:</label>
                    <input type="number" class="form-control" name="borderRadius">
                </div>`;
        } else if (tipoSeleccionado === 'barrasFlotantes') {
            camposDatosDiv.innerHTML = `
                <div class="mb-3">
                    <label class="form-label">Etiquetas (separadas por comas):</label>
                    <input type="text" class="form-control" name="Etiquetas" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Valores Inferiores (separados por comas):</label>
                    <input type="text" class="form-control" name="ValoresInferiores">
                </div>
                <div class="mb-3">
                    <label class="form-label">Valores Superiores (separados por comas):</label>
                    <input type="text" class="form-control" name="ValoresSuperiores">
                </div>
            `;
        }
    });

    // Inicializar el formulario al cargar
    categoriaGrafico.value = 'barras';
    categoriaGrafico.dispatchEvent(new Event('change'));

    setTimeout(() => {
        if (tipoGraficoSelect.options.length > 1) {
            tipoGraficoSelect.selectedIndex = 1;
            tipoGraficoSelect.dispatchEvent(new Event('change'));
        }
    }, 100);
});

