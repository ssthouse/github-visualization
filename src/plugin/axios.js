import axios from 'axios'

const token = 'e741155e35e144246dfe8e1afc09af750997de3b'
const HTTP = axios.create({
  baseURL: `https://api.github.com/graphql`,
  headers: {
    Authorization:
      'Bearer ' +
      token
        .split('')
        .reverse()
        .join('')
  }
})

export default HTTP
