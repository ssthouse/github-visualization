import axios from 'axios'

const HTTP = axios.create({
  baseURL: `https://api.github.com/graphql`,
  headers: {
    Authorization: 'Bearer d8cbee4b4e99d91d3a1ec221ffcb022c02723561'
  }
})

export default HTTP
