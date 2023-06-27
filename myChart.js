let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
// Тип графика
type: 'line',
 
// Создание графиков
data: {
    // Точки графиков
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
    // График
    datasets: [{
        label: 'Мой первый график на Chart.js', // Название
        backgroundColor: 'rgb(255, 99, 132)', // Цвет закраски
        borderColor: 'rgb(255, 99, 132)', // Цвет линии
        data: [0, 10, 5, 2, 20, 30, 45] // Данные каждой точки графика
    }]
},
 
// Настройки графиков
options: {}
});