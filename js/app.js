
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];


let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

let daySelect = null;

let mañana = document.getElementById('mañana');
let tarde = document.getElementById('tarde');
let noche = document.getElementById('noche');

mañana.addEventListener('click', ()=>showTurnMañana());
tarde.addEventListener('click', ()=>showTurnTarde());
noche.addEventListener('click', ()=>showTurnNoche());

let dayID = null;

let selectALL = document.getElementById('selectALL');
selectALL.addEventListener('click', ()=>selectAll());


// prevMonthDOM.addEventListener('click', ()=>lastMonth());
// nextMonthDOM.addEventListener('click', ()=>nextMonth());

const selectAll = () =>{
    var elements = document.getElementsByClassName('abc'); // get all elements
	for(var i = 0; i < elements.length; i++){
		elements[i].style.backgroundColor = "#2BCECF";
	}

}

const writeMonth = (month) => {

    for(let i = startDay(); i>0;i--){
        dates.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days">
            ${getTotalDays(monthNumber-1)-(i-1)}
        </div>`;
    }

    for(let i=1; i<=getTotalDays(month); i++){

        // if(i===currentDay) {
        // dates.innerHTML += `<div id="${i}" onclick="myFunction(${i}, event)" class="calendar__date calendar__item calendar__today">
        // ${i} 
        // </div>`;
        // } else
        //{
            dates.innerHTML += `<div id="${i}"  class="abc calendar__date calendar__item">
            <div onclick="myFunction(${i} , event)"> ${i} </div>
            <div id="${i}turnos1" class="turno"></div>
            <div id="${i}turnos2" class="turno"></div>
            <div id="${i}turnos3" class="turno"></div>
             </div>`;
        //}
    }
}

const getTotalDays = month => {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
}

const isLeap = () => {
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

const lastMonth = () => {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

const showTurnMañana = () => {
    const idTurno1 = dayID + 'turnos1';
    let turno1 = document.getElementById(idTurno1);
    if(dayID){
        turno1.innerHTML = `<span id="${dayID}turnonespanMañana">mañana  <i id="${dayID}turnone" onclick="hidden1(event)" class="fas fa-times-circle"></i> </span>`
    }
}


const showTurnTarde = () => {
    const idTurno2 = dayID + 'turnos2';
    let turno2 = document.getElementById(idTurno2);
    if(dayID){
        turno2.innerHTML = `<span id="${dayID}turntwospanTarde">tarde  <i id="${dayID}turntwo" onclick="hidden2(event)" class="fas fa-times-circle"></i> </span>`
    }
}

const showTurnNoche = () => {
    const idTurno3 = dayID + 'turnos3';
    let turno3 = document.getElementById(idTurno3);
    if(dayID){
        turno3.innerHTML = `<span id="${dayID}turnthreespanNoche">noche  <i id="${dayID}turnthree" onclick="hidden3(event)" class="fas fa-times-circle"></i> </span>`
    }
}

function hidden1(e){
    console.log(e.target.id)
    const idSpanMañana = e.target.id + 'spanMañana';
    document.getElementById(idSpanMañana).style.display = 'none'
}

function hidden2(e){
    console.log(e.target.id)
    const idSpanTarde = e.target.id + 'spanTarde';
    document.getElementById(idSpanTarde).style.display = 'none'
}

function hidden3(e){
    console.log(e.target.id)
    const idSpanNoche = e.target.id + 'spanNoche';
    document.getElementById(idSpanNoche).style.display = 'none'
}

function myFunction(id, elem) {
    dayID = id;
    const colorTwo  = "white";
    const colorOne = "rgb(43, 206, 207)";
	if (elem.target.className == "calendar__date calendar__item"){ 
		elem.target = elem.target.closest('.calendar__date .calendar__item'); 	
	}

	elem.target.style.backgroundColor = (elem.target.style.backgroundColor == colorOne) ? colorTwo : colorOne;
    
}





writeMonth(monthNumber);

