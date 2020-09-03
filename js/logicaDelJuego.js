$(document).ready( () => {
  const tablero = $('#tablero')
  let dificultad = localStorage.getItem('dificultad')
  if(dificultad=='Aleatorio'){
    let dificultades = ['Facil', 'Medio', 'Dificil', 'Imposible']
    dificultad = dificultades[Math.floor(Math.random() * (4-0))]
  }
  let colores = [
                '#f7f1e3','#CAD3C8','#84817a','#3d3d3d',
                '#fffa65','#FFC312','#F79F1F','#EE5A24',
                '#ff4d4d','#FC427B','#ED4C67','#EA2027',
                '#32ff7e','#A3CB38','#C4E538','#009432',
                '#18dcff','#12CBC4','#25CCF7','#1B9CFC',
                '#1289A7','#0652DD','#182C61','#1B1464',
                '#cd84f1','#7d5fff','#82589F','#3B3B98',
                '#58B19F','#7efff5','#9AECDB','#006266',
                '#B33771','#6D214F','#b33939','#2c2c54'
                ]
  colores = colores.sort(()=>Math.random()-0.5)  
  let numeros = []
  for(let i = 1; i<=36;i++){
    numeros.push(i)
  }
  let modoCartas = ['colores', 'numeros']
  let modo = modoCartas[Math.floor(Math.random() * (2-0))]
  let valores = []    
  let cantCartas
  let minDeJuego 
  let segDeJuego
  let tamColum = 2
  let tamFila = 3
  let virada_carta = 0
  let memoria_carta_ids = []
  let valor_memoria = []
  switch (dificultad) {
    case 'Facil':
      cantCartas = 12
      minDeJuego = 1
      segDeJuego = 01
      tamColum = 2
      tamFila = 6
      break;
    case 'Medio':
      cantCartas = 24
      minDeJuego = 1
      segDeJuego = 31
      tamColum = 2
      tamFila = 3
      break;
    case 'Dificil':
      cantCartas = 36
      minDeJuego = 2
      segDeJuego = 01
      tamColum = 2
      tamFila = 2
      break;
    case 'Imposible':
      cantCartas = 72
      minDeJuego = 2
      segDeJuego = 31
      tamColum = 1
      tamFila = 2
      break; 
    default:
      cantCartas = 12
      minDeJuego = 1
      segDeJuego = 01
      tamColum = 2
      tamFila = 6
      break;
  }
  switch(modo){
    case 'colores':
      for(let i = 0 ; i < cantCartas/2 ; i++){
        valores.push(colores[i])
        valores.push(colores[i])
      }
      break;
    case 'numeros':
      for(let i = 0 ; i < cantCartas/2 ; i++){
        valores.push(numeros[i])
        valores.push(numeros[i])
      }
      break;
    default:
      for(let i = 0 ; i < cantCartas/2 ; i++){
        valores.push(colores[i])
        valores.push(colores[i])
      }
      break;
  }
  console.log(valores)
  let informacionTablero = `<div class="informacion-tablero">
                              <p class="dificultad-tablero">Dificultad:${dificultad}</p>
                              <h3 class='titulo-tablero'>Reto Diario</h3>
                              <p class="tiempo-tablero">Tiempo restante: <span id='cuenta'></span></p>
                            </div>`
  jQuery(tablero).append(informacionTablero)
  /*Crear Cartas que ingreso en la tabla */
  const crearCartas = () => {
    virada_carta = 0
    let carta
    /* Desordeno los valores */
    valores = valores.sort(()=>Math.random()-0.5)
    for(let i = 0 ; i< cantCartas ; i++ ){
      switch (modo) {
        case 'colores':
          carta =`<div class='carta' id='carta${i}'>
                    <div class='lado frente' style='background: ${valores[i]}'>
                      
                    </div>
                    <div class='lado atras'>
                      <div class='ovalo'></div>
                    </div>
                  </div>`
          break;
        case 'numeros':
          carta =`<div class='carta' id='carta${i}'>
                    <div class='lado frente'>
                      <p>${valores[i]}</>
                    </div>
                    <div class='lado atras'>
                      <div class='ovalo'></div>
                    </div>
                  </div>`
          break;
        default:
          carta =`<div class='carta' id='carta${i}'>
                    <div class='lado frente' style='background: ${valores[i]}'>
                      
                    </div>
                    <div class='lado atras'>
                      <div class='ovalo'></div>
                    </div>
                  </div>`
          break;
      }
      jQuery(tablero).append(carta)
      document.getElementById(`carta${i}`).style.transform = 'rotateY(0deg)'
      $(`#carta${i}`).css('grid-column',`span ${tamColum}`)
      $(`#carta${i}`).css('grid-row',`span ${tamFila}`)
      $(`#carta${i}`).click(()=>{
        let valorTransform = document.getElementById(`carta${i}`).style.transform
        if(valorTransform == 'rotateY(0deg)' && valor_memoria.length < 2){
          document.getElementById(`carta${i}`).style.transform = 'rotateY(180deg)'
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
                  alert("Juego terminado")
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
    cuentaRegresiva(minDeJuego,segDeJuego)
  }
  const virarAtras = () =>{
    let carta_1 = document.getElementById(memoria_carta_ids[0])
    let carta_2 = document.getElementById(memoria_carta_ids[1])
    setTimeout(() => {
      carta_1.style.transform = 'rotateY(0deg)'
      carta_2.style.transform = 'rotateY(0deg)'  
    }, 1400);
    
    valor_memoria = []
    memoria_carta_ids = []
  }
  // Cuenta regresiva
  const cuentaRegresiva = (minutos, segundos) => {
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
      auxSeg = parseInt(auxSeg,10)
      if(auxSeg == 0 && auxMin == 0){
        alert('El tiempo se acabo')
        document.getElementById('tablero').innerHTML = "";
        jQuery(tablero).append(informacionTablero)
        crearCartas();
        clearInterval(tiempoActualizado)
      }
    },1000)
  }
  crearCartas()
})