import axios from 'axios'

const HTTP = axios.create({
  baseURL: `https://api.github.com/graphql`,
  headers: {
    Authorization: 'Bearer 74230b3cb1b6d4b32db19e16d6e2a1d784547db3'
  }
})

export default HTTP
