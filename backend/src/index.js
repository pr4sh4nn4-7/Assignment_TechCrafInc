
import app from './app.js'


const port = process.env.PORT || 9000
// server started
app.listen(port, () => {
  console.log(`Server listening in http:localhost:${port}`)
})
