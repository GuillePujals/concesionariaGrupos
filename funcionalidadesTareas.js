let operacionesArchivo = require('./operacionesArchivos');
let todosAutos = operacionesArchivo.leerArchivoJson();


let concesionaria = {
  //autos:  operacionesArchivo.leerArchivoJson(),

  
  // cuando se llama a este metodo se imprimen todos los autos en autos.json
  listar: function () { 
      console.log(todosAutos);
      },

      
  // cuando se llama a este metodo se imprimen todos los datos del auto con de la patente dada. 
  //Sino esta, devuelve null
  buscarAuto: (patente) => {
    for (let i = 0; i < todosAutos.length; i++) {
      if (todosAutos[i].patente == patente) return todosAutos[i];
    }
    return null;
  },


  // cuando se llama a este metodo se sobrescribe el objeto de autos, cambiando este auto en particular a vendido
  venderAuto: (patente) => {
    for (let i = 0; i < todosAutos.length; i++) {
      if (todosAutos[i].patente == patente) {
        todosAutos[i].vendido = true;
      }
    }
    operacionesArchivo.grabarUnJson(todosAutos);

  },

  autosParaLaVenta: () => { },
  // cuando se llama a este metodo se imprimen todos los autos en autos.json que su estado vendido es false


  autosNuevos: () => { },
  // cuando se llama a este metodo se imprimen todos los autos en autos.json que su estado vendido es false 
  //y sus km son cero
  // para determinar cuales no estan vendidos se aprovecha como callback del metodo anterior.


  // cuando se llama a este metodo se imprime un array de precios de autos cuyo estado vendido es true
  listaDeVentas: function () {
  // cuando se llama a este se suman los precios de todos los autos vendidos
  // los precios de los autos vendidos se los trae usando como callback el metodo anterior

    let autosVendidos = todosAutos.filter ( auto => auto.vendido == true);
    
    let ventas = [];
    autosVendidos.forEach(auto => ventas.push(auto.precio));

    return ventas;
      
  },
  
  totalDeVentas: function () {
        return this.listaDeVentas().reduce((totalVentas, precio) => totalVentas + precio);
    
   },


  puedeComprar: (auto, persona) => {
    if (auto.precio <= persona.capacidadDePagoTotal
      && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas) return true;
  },

  autosQuePuedeComprar: function (persona) {
    let autosPudeComprar = [];
    for (let i = 0; i < todosAutos.length; i++) {
      if (this.puedeComprar(todosAutos[i], persona)) autosPudeComprar.push(todosAutos[i]);
    };
    return autosPudeComprar;
  },

}

module.exports = concesionaria;
