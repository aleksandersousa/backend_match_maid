import { app } from './app'
import { PORT } from './endpoints'

app.listen(3333, () => {
  console.log(`http://localhost:${PORT}`)
})
