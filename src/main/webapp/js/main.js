const MAX_NUMBER_LENGTH = 4
const MIN_LENGTH_FOR_DISPLAY_MESSAGE = 2

class Main {
  constructor() {
    this.numbers = []
    this.partidos = new Map()
    this.voteIntention = null;
  }

  displayNumbers() {
    const displayElements = document.querySelectorAll(".display-number")

    displayElements.forEach((element, index) => {
      const numberVal = this.numbers[index]

      if (numberVal) {
        element.innerText = numberVal
      } else {
        element.innerText = ''
      }
    })
  }

  reactToNumbers() {
    if (this.numbers.length >= MIN_LENGTH_FOR_DISPLAY_MESSAGE) {
      let [num1, num2] = this.numbers
      let number = `${num1}${num2}`

      const partido = this.partidos.get(number);

      if (partido) {
        this.renderMessage(`Partido ${partido}`, 'messages-info')
      } else {
        this.renderMessage(`Partido nao encontrado`, 'messages-error')
      }
    }

    if (this.numbers.length < MIN_LENGTH_FOR_DISPLAY_MESSAGE) {
      this.clearMessages()
    }

    if (this.numbers.length == MAX_NUMBER_LENGTH) {
      this.fetchCandidate(this.numbers);
    }
  }

  addNumber(number) {
    if (this.numbers.length < MAX_NUMBER_LENGTH) {
      this.numbers.push(number)
      this.displayNumbers()
    }

    this.reactToNumbers()
  }

  removeNumber() {
    if (this.numbers.length == 0) return

    this.numbers.pop()
    this.displayNumbers()
    this.reactToNumbers()
  }

  registerKey(event) {
    const { key } = event
    
    switch (key) {
      case 'Backspace':
        this.removeNumber()
        break
      default:
        if (key >= '0' && key <= '9') {
          this.addNumber(key)
        }
    }
  }

  registerButtons() {
    const displayNumbers = document.querySelectorAll('.keyboard-digits')
    displayNumbers.forEach(displayButton => {
      const val = displayButton.dataset.digit

      displayButton.onclick = () => {
        this.addNumber(val)
      }
    })
  }


  enviaVoto() {
    if (this.voteIntention == null) return

    console.log('enviando voto ', this.voteIntention)
  }

  clearVotes() {
    this.removeNumber();
    this.voteIntention = null
  }

  registerActions() {
    const buttonBranco = document.querySelector("#btn-branco")
    const buttonCorrige = document.querySelector("#btn-corrige")
    const buttonConfirma = document.querySelector("#btn-confirma")

    buttonCorrige.onclick = this.clearVotes.bind(this)
    buttonBranco.onclick = () => {
      this.voteIntention = {
        type: "blank"
      }
    }

    buttonConfirma.onclick = this.enviaVoto.bind(this)
  }


  registerMessagesContainer() {
    this.messageContainer = document.getElementById("messages")
  }

  renderMessage(message, type) {
    this.messageContainer.innerText = message;
    this.messageContainer.classList.add(type)
  }

  clearMessages() {
    this.messageContainer.innerText = ''
    this.messageContainer.className = 'messages'
  }

  // fetch XML
  fetchInitalData() {
    fetch("/ApuracaoVotos/api/urna/")
      .then(response => response.text())
      .then(data => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "application/xml") 
        let items = doc.getElementsByTagName("partido")

        Array.from(items).forEach(partido => {
          let nome = partido.querySelector('nome').innerHTML;
          let numero = partido.querySelector('numero').innerHTML;

          this.partidos.set(numero, nome);
        })
      });
  }

  // XMLHttpRequest XML
  fetchCandidate(nums) {
    let [num1, num2, num3, num4] = nums
    let numbers = `${num1}${num2}${num3}${num4}`;
    let request = new XMLHttpRequest();

    const callback = (intention, message) => {
      this.voteIntention = intention;

      if (message) {
        this.renderMessage(message, 'messages-info')
      }
    }

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const data = this.responseText;

          let parser = new DOMParser();
          let doc = parser.parseFromString(data, "application/xml")
          let encontrou = doc.querySelector("encontrou").innerHTML;

          if (encontrou == "true") {
            const candidate = doc.querySelector('candidato')
            const nome = candidate.querySelector('nome').innerHTML
            const numero = candidate.querySelector('numero').innerHTML

            callback({ type: 'filled', numero, nome }, `Candidato ${nome}`)
          } else {
            callback(null, null)
          }
        }
    };

    request.open('GET', `/ApuracaoVotos/api/urna/candidate/${numbers}`);
    request.send();
  }

  init() {
    window.onkeyup = this.registerKey.bind(this)
    this.registerButtons()
    this.registerActions()
    this.registerMessagesContainer();
    this.fetchInitalData();
  }
}

let main = new Main()
main.init()
