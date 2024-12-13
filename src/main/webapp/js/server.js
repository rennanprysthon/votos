
const API = "/ApuracaoVotos/api"

export class ServerCalls {
  // fetch XML
  buscarPartidos(callback) {
    fetch(`${API}/urna/`)
      .then(response => response.text())
      .then(data => {
        let parser = new DOMParser()
        let doc = parser.parseFromString(data, "application/xml")
        let items = doc.getElementsByTagName("partido")

        let response = new Map()

        Array.from(items).forEach(partido => {
          let nome = partido.querySelector('nome').innerHTML
          let numero = partido.querySelector('numero').innerHTML

          console.log({nome, numero})
          response.set(numero, nome)
        })

        console.log({response})
        callback(response)
      })
  }

  // XMLHttpRequest XML
  buscarCandidato(numbers, callback) {
    let request = new XMLHttpRequest()

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const data = this.responseText

          let parser = new DOMParser()
          let doc = parser.parseFromString(data, "application/xml")
          let encontrou = doc.querySelector("encontrou").innerHTML

          if (encontrou == "true") {
            const candidate = doc.querySelector('candidato')
            const nome = candidate.querySelector('nome').innerHTML
            const numero = candidate.querySelector('numero').innerHTML

            callback({
              intention: { type: 'filled', numero, nome },
              message: `Candidato ${nome}`
            })
          } else {
        }
            callback({encontrado: false})
        }
    }

    request.open('GET', `${API}/urna/candidate/${numbers}`)
    request.send()
  }
}

