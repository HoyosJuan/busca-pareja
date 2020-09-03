$(document).ready( () => {
  $('#aleatorio').click((e)=>{
    e.preventDefault()
    localStorage.setItem('dificultad', 'Aleatorio');
    window.location.href = './pages/juego.html'
  })
  $('#facil').click((e)=>{
    e.preventDefault()
    localStorage.setItem('dificultad', 'Facil');
    window.location.href = './pages/juego.html'
  })
  $('#medio').click((e)=>{
    e.preventDefault()
    localStorage.setItem('dificultad', 'Medio');
    window.location.href = './pages/juego.html'
  })
  $('#dificil').click((e)=>{
    e.preventDefault()
    localStorage.setItem('dificultad', 'Dificil');
    window.location.href = './pages/juego.html'
  })
  $('#imposible').click((e)=>{
    e.preventDefault()
    localStorage.setItem('dificultad', 'Imposible');
    window.location.href = './pages/juego.html'
  })
})