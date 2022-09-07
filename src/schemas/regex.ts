const cardNumber = /^(\d{4}\s){3}\d{4}$/

const cardCVC = /^\d{3}$/

const dateFormat = /(?!^(00)|(1[3-9]))^[0-1]\d[/]\d{2}$/

const passwordFormat = /^\d{4}(?:\d{2})?$/

export { cardNumber, cardCVC, dateFormat, passwordFormat }
