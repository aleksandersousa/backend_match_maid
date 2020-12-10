import { app } from './app'
import { PORT } from './endpoints'

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
