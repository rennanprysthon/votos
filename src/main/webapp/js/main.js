const MAX_NUMBER_LENGTH = 4

class Main {
  constructor() {
    this.numbers = []
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

  addNumber(number) {
    if (this.numbers.length < MAX_NUMBER_LENGTH) {
      this.numbers.push(number)
      this.displayNumbers()
    }
  }

  removeNumber() {
    if (this.numbers.length == 0) return

    this.numbers.pop()
    this.displayNumbers()
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

  registerActions() {
    const buttonBranco = document.querySelector("#btn-branco")
    const buttonCorrige = document.querySelector("#btn-corrige")
    const buttonConfirma = document.querySelector("#btn-confirma")

    buttonCorrige.onclick = this.removeNumber.bind(this)
  }


  fetchInitalData() {
    // fetch("/")

    fetch("/ApuracaoVotos/api/urna/xml")
      .then(response => response.text())
      .then(data => console.log(data));
  }

  init() {
    window.onkeyup = this.registerKey.bind(this)
    this.registerButtons()
    this.registerActions()
    this.fetchInitalData();
  }
}

let main = new Main()
main.init()
