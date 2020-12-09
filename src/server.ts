import { app } from './app'

const {
  PORT = 3333
} = process.env

app.listen(3333, () => {
  console.log(`http://localhost:${PORT}`)
})
