$(document).ready( () => {
  const elementHoy = $('#fechaHoy')
  const elementSem = $('#fechaSemana')
  let fecha = new Date()
  let dia = ('0'+fecha.getDate()).slice(-2)
  let diaStr = fecha.toDateString().substr(0,3).trim()
  let inicioSem, finSem
  let mes = fecha.getMonth()
  switch (diaStr) {
    case 'Mon':
      inicioSem = ('0'+(parseInt(dia,10))).slice(-2)
      finSem = ('0'+(parseInt(dia,10) + 6)).slice(-2)
      break;
    case 'Tue':
      inicioSem = ('0'+(parseInt(dia,10)-1)).slice(-2)
      finSem = ('0'+(parseInt(dia,10) + 5)).slice(-2)
      break;
    case 'Wed':
      inicioSem = ('0'+(parseInt(dia,10) - 2)).slice(-2)
      finSem = ('0'+(parseInt(dia,10) + 4)).slice(-2)
      break;
    case 'Thu':
      inicioSem = ('0'+(parseInt(dia,10) - 3)).slice(-2)
      finSem = ('0'+(parseInt(dia,10) + 3)).slice(-2)
      break;
    case 'Fri':
      inicioSem = ('0'+(parseInt(dia,10) - 4)).slice(-2)
      finSem = ('0'+(parseInt(dia,10) + 2)).slice(-2)
      break;
    case 'Sat':
      inicioSem = ('0'+(parseInt(dia,10) - 5)).slice(-2)
      finSem = ('0'+(parseInt(dia,10) + 1)).slice(-2)
      break;
    case 'Sun':
      inicioSem = ('0'+(parseInt(dia,10) - 6)).slice(-2)
      finSem = ('0'+(parseInt(dia,10))).slice(-2)
      break;
    default:
      inicioSem = '01'
      finSem = '07'
      break;
  }
  switch (mes) {
    case 0:
      mes = "enero"
      break;
    case 1:
      mes = "febrero"
      break;
    case 2:
      mes = "marzo"
      break;
    case 3:
      mes = "abril"
      break;
    case 4:
      mes = "mayo"
      break;
    case 5:
      mes = "junio"
      break;
    case 6:
      mes = "julio"
      break;
    case 7:
      mes = "agosto"
      break;
    case 8:
      mes = "septiembre"
      break;
    case 9:
      mes = "octubre"
      break;
    case 10:
      mes = "noviembre"
      break;
    case 11:
      mes = "diciembre"
      break;
    default:

      break;
  }
  jQuery(elementHoy).append(`${dia} de ${mes}`)
  jQuery(elementSem).append(`${inicioSem} al ${finSem} de ${mes}`)
  console.log(dia,mes)
})