const canvas = document.getElementById('chart');
const divChart = document.getElementById('chart-2');
const data = [120, 280, 430, 170];

let dataSum = data.reduce((sum, elem) => sum + elem, 0);
let normalizedData = []; 
let startAngleArray = [];
let endAngleArray = [];

for (i = 0; i < data.length; i++) {
    normalizedData[i] = (data[i]/dataSum).toFixed(3);
}

startAngleArray[0] = 0;
endAngleArray[0] = Math.PI * 2 * normalizedData[0];

for (i = 1; i < data.length; i++) {
    endAngleArray[i] = endAngleArray[i-1] + Math.PI * 2 * normalizedData[i];
    startAngleArray[i] = endAngleArray[i-1];
}

console.log(data, normalizedData);
console.log(startAngleArray, endAngleArray)

function drawCanvasChart() {
    const context = canvas.getContext('2d');
    context.lineWidth = 15
    // startAngle = 0;
    for (i = 0; i < data.length; i++) {
        context.strokeStyle = `rgb(${Math.floor(Math.random()*255)}, 
                                   ${Math.floor(Math.random()*255)}, 
                                   ${Math.floor(Math.random()*255)})`
        // sectorWidth = Math.PI * 2 * normalizedData[i];
        // endAngle = startAngle + sectorWidth;
        context.beginPath();
        context.arc(200, 200, 100, startAngleArray[i] - Math.PI / 2, endAngleArray[i] - Math.PI / 2);
        context.stroke();
        // console.log(i, startAngle.toFixed(2), endAngle.toFixed(2), context.strokeStyle);
        // startAngle = endAngle;
    }

}

function makeSectorArc(currentColor) {
    let sector = document.createElement('div');
    sector.className = 'sector';
    sector.style.borderColor = currentColor;
    
    return sector;
}

function makeSectorPart(startAngle, sectorMask) {
    let sectorPart = document.createElement('div');
    sectorPart.className = 'sectorPart';
    sectorPart.style.transform = `rotate(${startAngle}rad)`;
    sectorPart.style.transformOrigin = 'left bottom';
    sectorPart.appendChild(sectorMask);
    return sectorPart;
}

function makeSectorMask(endAngle, sectorPart) {
    let sectorMask = document.createElement('div');
    sectorMask.className = 'sectorMask';
    sectorMask.style.transform = `rotate(${endAngle - Math.PI / 2}rad)`;
    sectorMask.style.transformOrigin = 'left bottom';
    sectorMask.appendChild(sectorPart);
    return sectorMask;
}

function WrapSectorParts(target, startAngle, endAngle) {  
    let sectorWidth = endAngle - startAngle;
    console.log(sectorWidth, Math.floor(sectorWidth/(Math.PI/2)));
    let currentColor = `rgb(${Math.floor(Math.random()*255)}, 
                            ${Math.floor(Math.random()*255)}, 
                            ${Math.floor(Math.random()*255)})`

    switch (Math.floor(sectorWidth/(Math.PI / 2))) {
        case 0: {
            let currentSector = makeSectorMask(endAngle, 
                                               makeSectorPart(startAngle - endAngle + Math.PI / 2, 
                                                              makeSectorArc(currentColor)));
            target.appendChild(currentSector);
            break;
        }
        case 1: {
            target.appendChild(makeSectorPart(startAngle, makeSectorArc(currentColor)));
            target.appendChild(makeSectorPart(endAngle - Math.PI / 2, makeSectorArc(currentColor)));
            break;
        }
        case 2: {
            target.appendChild(makeSectorPart(startAngle, makeSectorArc(currentColor)));
            target.appendChild(makeSectorPart(endAngle - Math.PI, makeSectorArc(currentColor)));
            target.appendChild(makeSectorPart(endAngle - Math.PI / 2, makeSectorArc(currentColor)));
            break;
        }
        case 3: {
            target.appendChild(makeSectorPart(startAngle, makeSectorArc(currentColor)));
            target.appendChild(makeSectorPart(endAngle - 3 * Math.PI / 2, makeSectorArc(currentColor)));
            target.appendChild(makeSectorPart(endAngle - Math.PI, makeSectorArc(currentColor)));
            target.appendChild(makeSectorPart(endAngle - Math.PI / 2, makeSectorArc(currentColor)));
            break;
        }
    }
    
    }

drawCanvasChart();

for (i = 0; i < data.length; i++) {
    let sectorWrapper = document.createElement('div');
    divChart.appendChild(sectorWrapper);
    sectorWrapper.className = 'sectorWrapper';
    WrapSectorParts(sectorWrapper, startAngleArray[i], endAngleArray[i]);
}