let dadosTemperatura = [];
let labels = [];

const contexto = document.getElementById('grafico_geral').getContext('2d');

const grafico = new Chart(contexto, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperatura (°C)',
            data: dadosTemperatura,
            borderColor: '#F4A300',
            backgroundColor: 'rgba(244, 163, 0, 0.2)',
            borderWidth: 3,
            tension: 0.3,
            pointBackgroundColor: '#FFD93D',
            pointBorderColor: '#4A3600',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                suggestedMin: 5,
                suggestedMax: 25,
                ticks: {
                    color: '#4A3600'
                },
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                    color: '#4A3600',
                    font: {
                        weight: 'bold'
                    }
                }
            },
            x: {
                ticks: {
                    color: '#4A3600'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    color: '#4A3600',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        elements: {
            point: {
                radius: 4,
            },
        }
    }
});

function carregarDados() {
    setInterval(() => {
        const hora = new Date();
        const horario = `${hora.getHours()}:${hora.getMinutes()}:${hora.getSeconds()}`;

        const temperatura = (Math.random() * (18 - 8) + 8).toFixed(1);

        if (labels.length >= 10) {
            labels.shift();
            dadosTemperatura.shift();
        }

        labels.push(horario);
        dadosTemperatura.push(temperatura);

        grafico.update();

        atualizarStatus(temperatura);

    }, 2000);
}

function atualizarStatus(temp) {
    const status = document.getElementById('setores_explosao');
    const temperatura = parseFloat(temp);

    if (temperatura >= 10 && temperatura <= 15) {
        status.innerHTML = 'Normal';
        status.style.color = '#49bf55';
    } else if (temperatura < 10) {
        status.innerHTML = 'Frio';
        status.style.color = '#007bff';
    } else {
        status.innerHTML = 'Quente';
        status.style.color = '#D9534F';
    }
}
