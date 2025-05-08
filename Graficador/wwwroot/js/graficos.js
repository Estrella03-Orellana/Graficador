function inicializarGrafico(config) {
    const ctx = document.getElementById('miGrafico').getContext('2d');

    let chartData = {
        labels: config.etiquetas,
        datasets: [{
            label: config.titulo,
            data: config.valores,
            backgroundColor: config.backgroundColor || generarColores(config.valores.length, 0.2),
            borderColor: config.borderColor || generarColores(config.valores.length, 1),
            borderWidth: 1
        }]
    };

    let chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {},
            y: { beginAtZero: true }
        },
        elements: {}
    };

    switch (config.tipo) {
        case 'barrasHorizontales':
            chartOptions.indexAxis = 'y';
            config.tipo = 'bar'; 
            break;

        case 'barrasApiladas':
            chartOptions.scales.x.stacked = true;
            chartOptions.scales.y.stacked = true;
            config.tipo = 'bar';
            break;

        case 'barrasApiladasGrupos':
            chartData.datasets = [
                {
                    label: 'Grupo A',
                    data: config.valores.map(v => v / 2),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)'
                },
                {
                    label: 'Grupo B',
                    data: config.valores.map(v => v / 2),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }
            ];
            chartOptions.scales.x.stacked = true;
            chartOptions.scales.y.stacked = true;
            config.tipo = 'bar';
            break;

        case 'barrasBordeRedondeado':
            chartData.datasets[0].borderRadius = config.borderRadius || 10;
            config.tipo = 'bar';
            break;

        case 'barrasFlotantes':
            chartData.datasets[0].data = config.valoresSuperiores.map((sup, idx) => ({
                yMin: config.valoresInferiores[idx],
                yMax: sup
            }));
            chartOptions.scales.y.beginAtZero = false;
            config.tipo = 'bar';
            break;

        case 'lineaInterpolacion':
            chartOptions.elements.line = { tension: 0.4 };
            config.tipo = 'line';
            break;

        case 'lineaEstiloPuntos':
            chartOptions.elements.point = {
                radius: 5,
                borderWidth: 2
            };
            config.tipo = 'line';
            break;

        case 'lineaEstiloSegmento':
            chartOptions.elements.line = {
                borderDash: [5, 5]
            };
            config.tipo = 'line';
            break;

        case 'lineaEscalonada':
            chartOptions.elements.line = {
                stepped: true
            };
            config.tipo = 'line';
            break;

        case 'escalaLinealMinMax':
            chartOptions.scales.y.min = 0;
            chartOptions.scales.y.max = 100;
            config.tipo = 'line';
            break;

        case 'escalaLinealMinMaxSugerido':
            chartOptions.scales.y.suggestedMin = 10;
            chartOptions.scales.y.suggestedMax = 90;
            config.tipo = 'line';
            break;

        case 'escalaLinealPaso':
            chartOptions.scales.y.ticks = {
                stepSize: 10
            };
            config.tipo = 'line';
            break;

        case 'escalaLogaritmica':
            chartOptions.scales.y.type = 'logarithmic';
            config.tipo = 'line';
            break;

        case 'doughnut':
            config.tipo = 'doughnut';
            break;

        case 'radar':
            config.tipo = 'radar';
            break;

        case 'comboBarLinea':
            chartData = {
                labels: config.etiquetas,
                datasets: [
                    {
                        type: 'bar',
                        label: 'Barra',
                        data: config.valores,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)'
                    },
                    {
                        type: 'line',
                        label: 'Línea',
                        data: config.valores,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        fill: false
                    }
                ]
            };
            break;

        case 'barraLinealApilada':
            chartData.datasets = [
                {
                    label: 'Línea',
                    type: 'line',
                    data: config.valores,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    label: 'Barras',
                    type: 'bar',
                    data: config.valores,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }
            ];
            chartOptions.scales.x.stacked = true;
            chartOptions.scales.y.stacked = true;
            break;
    }

    new Chart(ctx, {
        type: config.tipo,
        data: chartData,
        options: chartOptions
    });
}

function generarColores(cantidad, opacidad) {
    const coloresBase = [
        '255, 99, 132',
        '54, 162, 235',
        '255, 206, 86',
        '75, 192, 192',
        '153, 102, 255',
        '255, 159, 64'
    ];
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
        const color = coloresBase[i % coloresBase.length];
        colores.push(`rgba(${color}, ${opacidad})`);
    }
    return colores;
}

