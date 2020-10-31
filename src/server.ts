import { app } from './app'
import { db } from './db'

db.connect((err) => {
  if (err) {
    console.log('Error connecting to db: ' + err)
    return
  }
  console.log('connected to db')
})

app.listen(3000, () => {
  console.log('backend rodando na porta 3333..')
})
