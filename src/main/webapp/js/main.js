import { ServerCalls } from './server.js'

const MAX_NUMBER_LENGTH = 4
const MIN_LENGTH_FOR_DISPLAY_MESSAGE = 2

class Main {
  constructor() {
    this.numbers = []
    this.partidos = new Map()
    this.voteIntention = null
    this.serverCalls = new ServerCalls()
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

      const partido = this.partidos.get(number)

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
      let [num1, num2, num3, num4] = this.numbers
      let numbers = `${num1}${num2}${num3}${num4}`

      const callback = ({intention, message, encontrado = true}) => {
        if (!encontrado) {
          this.voteIntention = {
            type: "blank"
          }

          this.clearMessasges()

          return
        }

        this.voteIntention = intention

        if (message) {
          this.renderMessage(message, 'messages-info')
        }
      }

      this.serverCalls.buscarCandidato(numbers, callback)
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
    this.removeNumber()
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
    this.messageContainer.innerText = message
    this.messageContainer.classList.add(type)
  }

  clearMessages() {
    this.messageContainer.innerText = ''
    this.messageContainer.className = 'messages'
  }

  init() {
    window.onkeyup = this.registerKey.bind(this)
    this.registerButtons()
    this.registerActions()
    this.registerMessagesContainer()

    this.serverCalls.buscarPartidos((data) => {
      this.partidos = data;
    })
  }
}

let main = new Main()
main.init()
