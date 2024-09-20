let latitude //variavel pra pegar a lat
let longitude //variavel pra pegar a long
let useLocation = true // Variável para controlar se usar a localização do usuário

// Função para obter a localização atual do usuário usando a API de geolocalização
function getLocation() {
  //api nativa do js q busca a localização do usuario em tempo real
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude

    // Enviar requisição para a API OpenWeather, no caso pede chave e coloca na url oq a gente precisa pra buscar os dados
    const apiKey = `a7fa978810324e978fc2296a960b51da`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt_br`

    // Faz a requisição à API e processa a resposta
    fetch(apiUrl)
      /*é um método que é chamado quando a promessa (promise) anterior é resolvida. Em outras palavras, quando a requisição à API OpenWeather é concluída com sucesso, o método .then() é chamado.*/
      .then((response) => response.json())
      .then((data) => {
        showInfo({
          cidade: data.name,
          temp: data.main.temp,
          vento: data.wind.speed,
          humidade: data.main.humidity,
          clima: data.weather[0].main,
        })
        useLocation = false // Desativar a localização do usuário após a primeira busca
      })

      // Função de erro, caso a geolocalização não esteja disponível ou seja negada pelo usuário
      .catch((error) => console.error(`Error: ${error}`))
  })
}

//Aqui já é a função quando o usuario digita na barra de busca.
function showInfo(json) {
  // aqui são dados tipo string
  document.getElementById('cidade').innerHTML = `${json.cidade}`
  document.getElementById('temp').innerHTML = `${json.temp
    .toFixed(1)
    .toString()
    .replace('.', ',')}<sup>°C</sup>`
  document.getElementById('hum-n').innerHTML = `${json.humidade}%`
  document.getElementById('ven-n').innerHTML = `${json.vento.toFixed(1)}km/h`

  //aquisaõ dados do tipo "img"
  const imgClima = document.getElementById('img-temp')

  if (json.clima === 'Clouds') {
    imgClima.src = 'images/clouds.png'
  } else if (json.clima === 'Clear') {
    imgClima.src = 'images/clear.png'
  } else if (json.clima === 'Rain') {
    imgClima.src = 'images/rain.png'
  } else if (json.clima === 'Drizzle') {
    imgClima.src = 'images/drizzle.png'
  } else if (json.clima === 'Mist') {
    imgClima.src = 'images/mist.png'
  } else if (json.clima === 'Snow') {
    imgClima.src = 'images/snow.png'
  }
}

//e aqui no caso ele tras como resposta ao q o usuario pesquisou

// Event listener para o formulário de pesquisa
document
  .querySelector('#pesquisar')
  .addEventListener('submit', async (event) => {
    event.preventDefault()

    // Obtem o nome da cidade digitada pelo usuário
    const nomeCidade = document.getElementById('nome-cidade').value

    // Define a imagem do clima de acordo com a condição
    const imgClima = document.getElementById('img-temp')

    // Valida se o usuário digitou uma cidade
    if (!nomeCidade) {
      return alert('Você precisa digitar uma cidade...')
    }

    // Constrói a URL da API para buscar por nome da cidade
    const apiKey = `a7fa978810324e978fc2296a960b51da`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      nomeCidade
    )}&appid=${apiKey}&units=metric&lang=pt_br`

    // Faz a requisição à API e processa a resposta
    const results = await fetch(apiUrl)
    const json = await results.json()

    // Verifica se a requisição foi bem-sucedida
    if (json.cod === 200) {
      showInfo({
        cidade: json.name,
        temp: json.main.temp,
        vento: json.wind.speed,
        humidade: json.main.humidity,
        clima: json.weather[0].main,
      })
    } else {
      alert('Me desculpe, não foi possivel localizar')
    }
  })

// Chamar a função getLocation() quando a página é carregada
document.addEventListener('DOMContentLoaded', getLocation)
