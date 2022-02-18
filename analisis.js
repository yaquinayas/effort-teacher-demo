let nameActivity = document.getElementById("name_activity").value;
let activities = [

];
let id_activities = 0;

//function validation

function validationRegister(){
    
    const inputNameActivity = document.getElementById("name_activity").value;
    const inputTimeActivity = document.getElementById("time_activity").value;
    const inputDateActivity = document.getElementById("date_activity").value;
    const nodeName = document.getElementById("alert-name-activity");
    const nodeTime = document.getElementById("alert-time-activity");
    const nodeDate = document.getElementById("alert-date-activity");

    //usar un foreach ... recibir todo en un array y recorrerlo con funcion
    if(inputNameActivity == "" || inputDateActivity=="" || inputTimeActivity==""){
        if(inputNameActivity == ""){
                                
            nodeName.style.display = "block";
            
            
        }else
        {
            nodeName.style.display = "none";
            }
        
        if(inputTimeActivity == ""){
                                
            nodeTime.style.display = "block";
            
            ;
        }else
        {
            nodeTime.style.display = "none";
            }
        
        if(inputDateActivity == ""){
                                
            nodeDate.style.display = "block";
            
            ;
        }else
        {
            nodeDate.style.display = "none";
            }
            return false
    }else{
        nodeName.style.display = "none";
        nodeTime.style.display = "none";
        nodeDate.style.display ="none";
        return true}


}



//Register activity

function onClickButtonRegisterActivity(){
   if (validationRegister()){
        
    

        const inputNameActivity = document.getElementById("name_activity").value;
        const inputTimeActivity = document.getElementById("time_activity").value;
        const inputDateActivity = document.getElementById("date_activity").value;
        
        registerActivity(inputNameActivity, inputTimeActivity, inputDateActivity);
        updateResumeActivities();
    }
}

function registerActivity(name, time, date){
    id_activities += 1;
    const plusId = id_activities;
    let activity = {
        "id": plusId,
        "name": name,
        "time" : time,
        "date" : date
    }
    activities.push(activity);
    updateRegisterActivity(name, date, time, plusId);
}   

function updateRegisterActivity(nameActivity, dateActivity, hoursActivity, plusId){
    
    const historyActivities = document.getElementById("added_acitivities");
    historyActivities.innerHTML += `<div id="activity-${plusId}" class="activity-added"><li> Nombre: ${nameActivity} Fecha: ${dateActivity} Horas: ${hoursActivity} </li> 
        <div class="icon-button edit-icon">
        <button type="button" onclick="onClickEditActivity(${plusId})">
            <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" />
        </button>
        </div>
        <div class="icon-button delete-icon">
        <button type="button"  onclick="onClickDeleteActivity(${plusId})">
            <img src="https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png" />
        </button>
        </div>
    </div>
    `;
    
}

//Resume activities

function updateResumeActivities(){
    const newTotalReportedHours = totalReportedHours();
    const totalHours = document.getElementById("total_hours");
    totalHours.innerText = `Total de horas reportadas: ${newTotalReportedHours} horas`;


    const moreWorkWeekHours = moreWorkPerWeek();
    const weekMoreWorked = document.getElementById("most_worked_week");
    weekMoreWorked.innerText = `Semana más laborada ${moreWorkWeekHours.week} con ${moreWorkWeekHours.time} horas `;

    const promHoursWorkWeek = promHoursPerWeek(newTotalReportedHours);
    const promHoursWorkedPerWeek = document.getElementById("prom_week_hours");
    promHoursWorkedPerWeek.innerText = `Promedio de horas trabajadas a la semana: ${promHoursWorkWeek} horas`

    const totalWorkWeek = totalWeeks();
    const totalWorkedWeek = document.getElementById("total_weeks");
    totalWorkedWeek.innerText = `Total de semanas reportadas: ${totalWorkWeek}`;
}


//Functions helpers activities resume





function totalReportedHours(){

    /* mapear las horas */
    var sumaHours;
    //validación cuando el array está vacio
    if (activities.length == 0){
        
        return sumaHours = 0; ;
    }
    var mapHours = activities.map(
    function(activity){
        return activity.time;
        }
    )
        
    sumaHours = mapHours.reduce(
        function(valorAcumulado= 0, nuevoElemento){
            
            return parseInt(valorAcumulado) + parseInt(nuevoElemento);
        }
    )
    return sumaHours;
}
//En el momento suma las horas trabajadas a la semana

function listWeeksWithHours(){
    const listaSemanas = {

    };

    activities.map(
        function(activity){
            if(listaSemanas[activity.date]){
                //encuentra que existe la semana, suma tiempo.
                listaSemanas[activity.date] += parseInt(activity.time);

            } else {
                //no existe. Crea primera instancia
                listaSemanas[activity.date] = parseInt(activity.time);
            }
        }
    );
    return listaSemanas;
}

function moreWorkPerWeek(){

    //contaremos todas las horas por semanas
    //construye un objeto
    const listaSemanas = listWeeksWithHours();
    const infoWeekMoreWork = {
        "week" : "",
        "time" : 0,
    };
    
    /* //retornaba las horas por semanas
    return listaSemanas;
 */
    var aux=0;
    var semanaMoreWork=0;
    //ordenar semanas de menor a mayor

    for (const property in listaSemanas) {
        console.log(`${property}: ${listaSemanas[property]}`);
      }

    for(const semana in listaSemanas){
        if (listaSemanas[semana]>aux){
            aux = listaSemanas[semana];
            semanaMoreWork = semana;
            infoWeekMoreWork.time = aux;
            infoWeekMoreWork.week = semana;
        }
    }
    console.log(`Semana más trabajada ${semanaMoreWork} con ${aux} horas`);
   
    

    return infoWeekMoreWork;

    
    
}

function promHoursPerWeek(totalHours){
    const listaSemanas = listWeeksWithHours();
    const numberWeeks= Object.keys(listaSemanas).length;
    var promHPW;
    if(numberWeeks == 0){return promHPW = 0;}
    else{
        promHPW = totalHours/numberWeeks;
    }
    return promHPW;
}

function totalWeeks(){
    const listaSemanas = listWeeksWithHours();
    const numberWeeks = Object.keys(listaSemanas).length;
    return numberWeeks;
}


function onClickDeleteActivity(idActivity){
   //buscarlo
    const takeActivity = activities.find(takeActivity => takeActivity.id == idActivity);
    //buscaré el index
    const indexActivity = findIndexActivityById(idActivity);

    console.log("borrando index numero");
    console.log(indexActivity);
    activities.splice(indexActivity, 1);

    /* delete html */
    
    var divPerErase= document.getElementById('activity-'+ eval(idActivity));
    divPerErase.remove();
    updateResumeActivities();
    /* end delete */
}

function findIndexActivityById(idActivity){
    for (var i=0; i<activities.length; i++){
        if(activities[i].id == idActivity){
            console.log("Encontrado")
            return i;
            
        }
    }
}

function onClickEditActivity(idActivity){
    var indexActivity = findIndexActivityById(idActivity);
    /* print in html info */
    
    
    nameActivity = activities[indexActivity];
   
   
   console.log(nameActivity);
   
    document.f1.name_activity.value = nameActivity.name;
    document.f1.time_activity.value = nameActivity.time;
    document.f1.date_activity.value = nameActivity.date;
  
    const titleEditActivity = document.getElementById('title_activity');
    titleEditActivity.innerHTML=`Editando actividad ${nameActivity.id}`;
    document.getElementById('button_register').style.display = 'none';
    document.getElementById('button_update').style.display = 'block';
    document.getElementById('button_cancel').style.display = 'block';
    document.getElementById('index_activity').value = indexActivity;
    document.getElementById('id_activity').value = idActivity;
    /* update */
    
    
}

function onClickButtonUpdateActivity(){
    /* TODO validación de cambios */
    const indexActivity = document.getElementById('index_activity').value;
    console.log(indexActivity);

    const nameUpdateActivity = document.getElementById('name_activity').value;
    const timeUpdateActivity = document.getElementById('time_activity').value;
    const dateUpdateActivity = document.getElementById('date_activity').value;

    //asignando nuevos valores
    const myActivity = activities[indexActivity];
    myActivity.name = nameUpdateActivity;
    myActivity.time = timeUpdateActivity;
    myActivity.date = dateUpdateActivity;

    /* ToDo Actualizar Actividades registradas */
    const idActivityToUpdate = document.getElementById('id_activity').value;
   
    //reescribiendo
    var divToEdit1 = document.getElementById(`activity-${idActivityToUpdate}`).childNodes;

    divToEdit1[0].innerText = `Nombre: ${nameUpdateActivity} Fecha: ${dateUpdateActivity} Horas: ${timeUpdateActivity}`;
    


    document.getElementById('p-alert').innerText="Actualizado satisfactoriamente";
    document.getElementById('p-alert').style.display = 'block';
    document.getElementById('button_update').style.display = 'none';
    document.getElementById('button_cancel').style.display = 'none';
    document.getElementById('button_register').style.display = 'block';
    

    updateResumeActivities();
   /*  const titleEditActivity = document.getElementById('title_activity');
    titleEditActivity.innerHTML=`Registro de actividades`; */



}
function onClickButtonCancelUpdateActivity(){
    const titleEditActivity = document.getElementById('title_activity');
    titleEditActivity.innerHTML=`Registro de actividades`;

    document.f1.name_activity.value = "";
    document.f1.time_activity.value = "";
    document.f1.date_activity.value = "";
    document.getElementById('button_update').style.display = 'none';
    document.getElementById('button_cancel').style.display = 'none';
    document.getElementById('button_register').style.display = 'block';
}

//ToDo Semanas trabajadas
//ToDo Incluir más detalles en actividades registradas
//edit and delete
//ToDo Agregar pestaña para organizar el contenido 

//ToDo when delete item, update Resume Activities

//ToDo mensaje de registro exitoso