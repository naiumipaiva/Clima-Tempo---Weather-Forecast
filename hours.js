document.addEventListener('DOMContentLoaded', function () {
  // Obter a hora atual
  const date = new Date()
  const hour = date.getHours()

  // Referência para a div com id "conteiner"
  const container = document.getElementById('conteiner')

  // Função para alterar a cor com base na hora
  function mudarCorPorHora(hour) {
    let cor

    if (hour >= 5 && hour < 12) {
      // Manhã (6h - 12h)
      cor = 'linear-gradient(to bottom right, #7EFFC7, #2280C2)'
    } else if (hour >= 12 && hour < 18) {
      // Tarde (12h - 18h)
      cor = 'linear-gradient(to bottom right, #FE2494, #FDC21F)'
    } else if (hour >= 18 && hour < 23) {
      // Noite (18h - 23h)
      cor = 'linear-gradient(to bottom right, #579AE5, #180A44)'
    } else {
      // Magrugada (23h - 4h)
      cor = 'linear-gradient(to bottom right, #F8A39C, #3A4DB3)'
    }

    // Aplicar a cor como background do container
    container.style.backgroundImage = cor
  }

  // Chamar a função para definir a cor inicial
  mudarCorPorHora(hour)
})
