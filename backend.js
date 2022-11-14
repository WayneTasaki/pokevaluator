// // import fetch from 'node-fetch'

// const PORT = 8000
// const express = require('express')
// const cors = require('cors')
// const axios = require('axios')
// require('dotenv').config()

// const app = express()

// app.use(cors())

// app.get('/', (req,res) => {
//   res.json('hi')
// })

// app.get('/data', (req,res) => {
//   const options = {
//     method: 'GET',
//     url: `https://api.pokemontcg.io/v2/cards`,
//     headers: {
//       'X-Api-Key': process.env.REACT_APP_API_KEY
//     }
//   }

//   axios.request(options).then((response) => {
//     res.json(response.data) 
    
    
//   }).catch((error) => {
//     console.log(error)
//   })
  
// })

// // https://api.pokemontcg.io/v2/cards

// app.listen(8000, () => console.log(`Server is running on port ${PORT}`))