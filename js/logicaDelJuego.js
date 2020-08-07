$(document).ready( () => {
  const tablero = $('#tablero')
  let dificultades = ['Facil', 'Medio', 'Dificil', 'Imposible']
  let nivel = Math.floor(Math.random() * (4-0))
  let dificultad = dificultades[nivel]
  let valores = ['#FFC312','#12CBC4','#ED4C67','#FFC312','#12CBC4','#ED4C67']
  let cantCartas
  let minDeJuego 
  let segDeJuego
  let virada_carta = 0
  let memoria_carta_ids = []
  let valor_memoria = []
  switch (dificultad) {
    case 'Facil':
      cantCartas = 6
      minDeJuego = 0
      segDeJuego = 46
      break;
    case 'Medio':
      cantCartas = 8
      minDeJuego = 1
      segDeJuego = 01
      valores.push('#B53471')
      valores.push('#B53471')
      break;
    case 'Dificil':
      cantCartas = 10
      minDeJuego = 1
      segDeJuego = 16
      valores.push('#B53471')
      valores.push('#1289A7')
      valores.push('#B53471')
      valores.push('#1289A7')
      break;
    case 'Imposible':
      cantCartas = 12
      minDeJuego = 1
      segDeJuego = 31
      valores.push('#B53471')
      valores.push('#1289A7')
      valores.push('#EA2027')
      valores.push('#B53471')
      valores.push('#1289A7')
      valores.push('#EA2027')
      break; 
    default:
      cantCartas = 6
      minDeJuego = 0
      segDeJuego = 46
      break;
  }
  let informacionTablero = `<div class="informacion-tablero">
                              <p class="dificultad-tablero">Dificultad:${dificultad}</p>
                              <h3 class='titulo-tablero'>Reto Diario</h3>
                              <p class="tiempo-tablero">Tiempo restante:<span id='cuenta'></span></p>
                            </div>`
  jQuery(tablero).append(informacionTablero)
  /*Crear Cartas que ingreso en la tabla */
  const crearCartas = () => {
    virada_carta = 0
    let carta
    /* Desordeno los valores */
    valores = valores.sort(()=>Math.random()-0.5)
    for(let i = 0 ; i< cantCartas ; i++ ){
      carta =`<div class='carta' id='carta${i}' data-value='${valores[i]}'>
                <div class='lado frente' style='background:${valores[i]}'>

                </div>
                <div class='lado atras'>
                  <div class='ovalo'></div>
                </div>
              </div>`
      jQuery(tablero).append(carta)
      document.getElementById(`carta${i}`).style.transform = 'rotateY(0deg)'
      $(`#carta${i}`).click(()=>{
        let othervalorTransform = document.getElementById(`carta${i}`).style.transform
        console.log(othervalorTransform)
        if(othervalorTransform == 'rotateY(0deg)' && valor_memoria.length < 2){
          console.log("girar")
          document.getElementById(`carta${i}`).style.transform = 'rotateY(180deg)'
          console.log(document.getElementById(`carta${i}`).style.transform)
          if(valor_memoria.length == 0){
            valor_memoria.push(valores[i])
            memoria_carta_ids.push(`carta${i}`)
          }else if(valor_memoria.length == 1){
            valor_memoria.push(valores[i])
            memoria_carta_ids.push(`carta${i}`)
            if(valor_memoria[0] == valor_memoria[1]){
              virada_carta += 2
              valor_memoria = []
              memoria_carta_ids = []
              if(virada_carta == cantCartas){
                setTimeout(() => {
                  alert("Horacio se la come")
                  document.getElementById('tablero').innerHTML = "";
                  jQuery(tablero).append(informacionTablero)
                  crearCartas();
                }, 800);
              }
            }else{
              virarAtras()
            }
          }
        }
      })
    } 
    miCuenta(minDeJuego,segDeJuego)
  }
  const virarAtras = () =>{
    let carta_1 = document.getElementById(memoria_carta_ids[0])
    let carta_2 = document.getElementById(memoria_carta_ids[1])
    setTimeout(() => {
      carta_1.style.transform = 'rotateY(0deg)'
      carta_2.style.transform = 'rotateY(0deg)'  
    }, 1800);
    
    valor_memoria = []
    memoria_carta_ids = []
  }
  // Mi propia cuenta regresiva
  const miCuenta = (minutos, segundos) => {
    let auxMin = minutos
    let auxSeg = segundos
    const el = document.getElementById('cuenta')
    const tiempoActualizado = setInterval( () =>{
      if(auxSeg==0){
        auxMin -= 1
        auxSeg = 60
      }
      auxSeg = ('0' + (auxSeg - 1)).slice(-2)
      el.innerHTML =`0${auxMin}:${auxSeg}`
      console.log(`0${auxMin}:${auxSeg}`)
      auxSeg = parseInt(auxSeg,10)
      if(auxSeg == 0 && auxMin == 0){
        alert('El tiempo se acabo')
        // virarAtras()
        document.getElementById('tablero').innerHTML = "";
        jQuery(tablero).append(informacionTablero)
        crearCartas();
        clearInterval(tiempoActualizado)
      }
    },1000)
  }
  crearCartas()
})