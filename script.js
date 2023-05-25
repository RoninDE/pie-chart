const canvas = document.getElementById('chart');
const data = [100, 250, 150, 400, 300];

let dataSum = data.reduce((sum, elem) => sum + elem, 0);
let normalizedData = [];

for (i = 0; i <data.length; i++) {
    normalizedData[i] = (data[i]/dataSum).toFixed(2);
}
// normalizedData.unshift(0);

console.log(data, normalizedData);

function drawChart() {
    const context = canvas.getContext('2d');
    context.lineWidth = 15
    startAngle = 0;
    for (i = 0; i < data.length; i++) {
        context.strokeStyle = `rgb(${Math.floor(Math.random()*255)}, 
                                   ${Math.floor(Math.random()*255)}, 
                                   ${Math.floor(Math.random()*255)})`
        sectorWidth = Math.PI * 2 * normalizedData[i];
        endAngle = startAngle + sectorWidth;
        context.beginPath();
        context.arc(200, 200, 100, startAngle, endAngle);
        context.stroke();
        console.log(i, startAngle.toFixed(2), endAngle.toFixed(2), context.strokeStyle);
        startAngle = endAngle;
    }

}

drawChart();