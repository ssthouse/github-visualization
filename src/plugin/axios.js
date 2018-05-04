import axios from 'axios'

const HTTP = axios.create({
  baseURL: `https://api.github.com/graphql`,
  headers: {
    Authorization: 'Bearer 83f30f4332b2371486791b2fadd8f677f476a8c2'
  }
})

export default HTTP
