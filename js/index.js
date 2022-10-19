
//Evento change al cambiar de opción en el elemento select
function iniciar(){
    var select = document.getElementById("fabricante");
    var button = document.getElementById("btnAgregar");

    //Al producirse en evento change en el elemento select
    //invocar a la función addOptions para volver a llenar
    //el select dependiente con los datos adecuados
    if(select.addEventListener){
        select.addEventListener("change", function(){
            addOptions(marcas[this.options[this.selectedIndex].text],document.frmcar.modelo);
            carro.mostrar();
        }, false);
    }

    //Al producirse un click sobre el botón de envío
    //invocar los métodos del objeto carro que mostrarán
    //los valores ingresados en el formulario
    if(button.addEventListener){
        button.addEventListener("click", function(){
        var seleccion = showRadioSelected(document.frmcar.radcolor);
        carro.pedido(document.frmcar.nombre.value,document.frmcar.dui.value,document.frmcar.nit.value,document.frmcar.fabricante.value, document.frmcar.modelo.value,seleccion, document.frmcar.txtanio.value);
        carro.mostrar();
        }, false);
    }
}

//Inicializando matriz para manejar las marcas y sus modelos
var marcas = new Array(7);
marcas["Toyota"] = ["Corolla", "Echo", "Yaris",  "Camry", "Land Cruiser", "4 Runner", "Hilux"];
marcas["Nissan"] = ["Sentra", "Platina", "Almera", "Altima", "Pathfinder"];
marcas["Chevrolet"] = ["Malibu", "Corvette", "Chevy","Avalanche", "Trailblazer"];
marcas["Honda"] = ["Civic", "Acura", "Accord", "Fit", "Odyssey"];
marcas["Mitsubishi"] = ["Lancer", "Galant", "Eclipse", "Montero", "Nativa"];

//Creando el objeto carro con el constructor Object()
var carro = new Object();
//Propiedades del objeto
carro.duenio = "";
carro.dui = "";
carro.nit = "";
carro.fabricante = "";
carro.modelo = "";
carro.color = "";
carro.anio = "";
//Métodos del objeto
carro.pedido = function(nom, dui, nit, fab, mod, col, an){
    carro.duenio = nom;
    carro.dui = dui;
    carro.nit = nit;
    carro.fabricante = fab;
    carro.modelo = mod;
    carro.color = col;
    carro.anio = an;
}
carro.mostrar = function(){
    var tabla = "";
    var info = document.getElementById('infocarro');
    tabla += "<table class=\"carinfo\">\n";
    tabla += "<thead>\n\t<tr>\n";
    tabla += "\t\t<th colspan=\"2\">Datos del carro</th>\n";
    tabla += "\t</tr>\n</thead>\n";
    tabla += "<tbody>\n\t";
    tabla += "\t<tr>\n\t\t<td>Dueño: </td>\n";
    tabla += "\t\t<td>" + carro.duenio + "</td>\n\t</tr>\n";
    tabla += "\t<tr>\n\t\t<td>DUI: </td>\n";
    tabla += "\t\t<td>" + carro.dui + "</td>\n\t</tr>\n";
    tabla += "\t<tr>\n\t\t<td>NIT: </td>\n";
    tabla += "\t\t<td>" + carro.nit + "</td>\n\t</tr>\n";
    tabla += "\t<tr>\n\t\t<td>Fabricante: </td>\n";
    tabla += "\t\t<td>" + carro.fabricante + "</td>\n\t</tr>\n";
    tabla += "\t<tr>\n\t\t<td>Modelo: </td>\n";
    tabla += "\t\t<td>" + carro.modelo + "</td>\n\t</tr>\n";
    tabla += "\t<tr>\n\t\t<td>Color: </td>\n";
    tabla += "\t\t<td>" + carro.color + "</td>\n\t</tr>\n";
    tabla += "\t<tr>\n\t\t<td>Año: </td>\n";
    tabla += "\t\t<td>" + carro.anio + "</td>\n\t</tr>\n";
    tabla += "\t</tbody>\n</table>\n";
    info.innerHTML = tabla;
}
//Métodos del objeto
function showRadioSelected(radiogroup){
    var seleccionado;
    var numradios = radiogroup.length;
    for(var i=0; i<numradios; i++){
        if(radiogroup[i].checked){
            seleccionado = radiogroup[i].value;
        }
    }
    return seleccionado;
}
function removeOptions(optionMenu){
    for(i=0; i<optionMenu.options.length; i++){
        optionMenu.options[i] = null;
    }
}
function addOptions(optionList, optionMenu){
    var i=0;
    removeOptions(optionMenu); //Limpia las opciones
    for(i=0; i<optionList.length; i++){
        optionMenu[i] = new Option(optionList[i], optionList[i]);
    }
}

//Clase para verificaciones
class Verificaciones{
    veriDui(dui){
        this.re = /^\d{8}-\d{1}$/;
        if(this.re.test(dui)){
            this.DuiVeric = true;
        }else{
            this.DuiVeric = false;
        }
    }

    veriNit(nit){
        this.re = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;
        if(this.re.test(nit)){
            this.NitVeric = true;
        }else{
            this.NitVeric = false;
        }
    }

    veriPlaca(placa){
        this.re = /^[PONAVD]{1}\s[0-9]{1,3}\s[A-F0-9]{3}$/;
        if(this.re.test(placa)){
            this.PlacaVeric = true;
        }else{
            this.PlacaVeric = false;
        }
    }

    veriNombre(nombre){
        this.re = /[a-zA-Z]/;
        if(this.re.test(nombre)){
            this.NomVeric = true;
        }else{
            this.NomVeric = false;
        }
    }

    veriFallas(fallas){
        this.re = /[a-zA-Z0-9/()*\s]{20,500}/;
        if(this.re.test(fallas)){
            this.FallasVeri = true;
        }else{
            this.FallasVeri = false;
        }
    }

    veriAno(ano){
        if(ano>1900 && ano<2023){
            this.ano = true;
        }else{
            this.ano = false;
        }
    }

    getVeriDui(){
        return this.DuiVeric;
    }

    getVeriNit(){
        return this.NitVeric;
    }

    getVeriNombre(){
        return this.NomVeric;
    }

    getVeriFallas(){
        return this.FallasVeri;
    }

    getVericPlaca(){
        return this.PlacaVeric;
    }
    getVericAno(){
        return this.ano;
    }
}

//funcion load para crear la base de datos utiliando indexedDB
window.addEventListener('load', ()=>{

    iniciar();

    let baseDatos;
    //Creando Base de Datos
    let conexion = indexedDB.open('automoviles', 1);

    //funcion anonima para verificar la conexion con la base de datos
    conexion.onsuccess = function(evento){
        baseDatos = evento.target.result;
    }

    conexion.onerror = function(evento){
        document.querySelector('#resultado').innerText = `Error al abrir la base de datos: ${evento.target.errorCode}` ;
    }

    conexion.onupgradeneeded = function(evento){
        baseDatos = evento.target.result;

        //Creando la tabla
        let automoviles = baseDatos.createObjectStore('automoviles',{autoIncrement: true});
    }

    document.querySelector('#btnAgregar').addEventListener('click', function(evento){
        let nom = document.querySelector('#nombre').value;
        let dui = document.querySelector('#dui').value;
        let nit = document.querySelector('#nit').value;
        let anio = document.querySelector("#anio").value;
        let marca = document.querySelector('#fabricante').value;
        let modelo = document.querySelector('#modelo').value;
        let color = document.querySelector('#radcolor').value;;
        let placa = document.querySelector('#placa').value;
        let falla = document.querySelector('#fallas').value;

        //Verificando que el campo tenga un valor
        const Verific = new Verificaciones();
        Verific.veriDui(dui);
        Verific.veriNit(nit);
        Verific.veriPlaca(placa);
        Verific.veriNombre(nom);
        Verific.veriFallas(falla);
        Verific.veriAno(anio);

        if(Verific.getVeriDui() && Verific.getVericPlaca() && Verific.getVeriNombre() && Verific.getVeriNit() && Verific.getVeriFallas() && Verific.getVericAno()){
            //seleccionando el documento a modificar y el tipo de operacion
            let transaccion = baseDatos.transaction(['automoviles'], 'readwrite');
            //accediendo al documento automoviles
            let automoviles = transaccion.objectStore('automoviles');
            //Creando objeto automovil
            let automovil = {nombre: nom, dui: dui, nit: nit, año: anio, marca: marca, modelo: modelo,  color: color, placa: placa, fallas: falla};
            //agregando vehiculo a la tabla
            automoviles.add(automovil);
            //verificando el proceso
            transaccion.oncomplete = function(){
                document.querySelector('#resultado').innerText = 'El vehiculo se agrego de fomra exitosa!!';
            }

            transaccion.onerror = function(evento){
                document.querySelector('#resultado').innerText = `Error al almacenar el vehiculo: ${evento.target.errorCode}`;
            }
        }else{
            if(!Verific.getVeriDui()){
                alert('error, El Dui no tiene el formato correcto ########-#');
            }
    
            if(!Verific.getVericPlaca()){
                alert('error, La placa no tiene el formato Correcto ejemplo # ### ###');
            }
    
            if(!Verific.getVeriNombre()){
                alert('error, El nombre solo debe contener Letras y no debe estar vacio');
            }
    
            if(!Verific.getVeriNit()){
                alert('Error, El nit no tiene el formato correcto ####-######-###-#')
            }
    
            if(!Verific.getVeriFallas()){
                alert('Error, Las fallas necesitan al menos 20 caracteres')
            }
            
            if(!Verific.getVericAno()){
                alert('Error, el año debe estar en el rango de 1900 y 2022');
            }
        }
        
        /*if(dui.length){
            //seleccionando el documento a modificar y el tipo de operacion
            let transaccion = baseDatos.transaction(['automoviles'], 'readwrite');
            //accediendo al documento notas
            let automoviles = transaccion.objectStore('automoviles');
            //Creando objeto automovil
            let automovil = {nombre: nombre, dui: dui, nit: nit, año: anio, marca: marca, modelo: modelo,  color: color, placa: placa, fallas: falla};
            //agregando vehiculo a la tabla
            automoviles.add(automovil);

            //verificando el proceso
            transaccion.oncomplete = function(){
                document.querySelector('#resultado').innerText = 'El vehiculo se agrego de fomra exitosa!!';
            }

            transaccion.onerror = function(evento){
                document.querySelector('#resultado').innerText = `Error al almacenar el vehiculo: ${evento.target.errorCode}`;
            }
        
        }else{
            document.querySelector('#resultado').innerText = 'ERROR.CAMPO VACIO';
        }*/
    });
});