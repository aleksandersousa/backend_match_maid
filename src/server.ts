import { app } from './app'
import { PORT } from './endpoints.config'

app.listen(3333, () => {
  console.log(`http://localhost:${PORT}`)
})
