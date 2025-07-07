const ctx = document.getElementById('grafico-bar-vendidos');

Chart.defaults.color = 'black'
Chart.defaults.font.weight="bolder"
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Producto 1', 'Producto 2',
            'Producto 3', 'Producto 4'],
        datasets: [{
            label: '# Cantidad vendidas del producto',
            data: [19,35,46,5],
            borderWidth: 2,
            backgroundColor: ['rgb(255, 255, 255,0.8)','rgb(173, 209, 144)',
                'rgb(119, 157, 168)','rgb(224, 173, 184)',
                //? Por si hay otros más
                'rgb(255, 255, 255,0.8)','rgb(173, 209, 144)',
                'rgb(119, 157, 168)','rgb(224, 173, 184)'
            ]
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                stepSize:5,
                // ticks:{
                //     color:'black'
                // }
            },
            x:{
                // ticks:{
                //     color:'black'
                // }
            }
        }
    }
});
