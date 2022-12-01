import db from '../../db/index.js'

const user = {
  get: async (req, res) => {
    await db.query('SELECT NOW()', (err, res) => {
      console.log(err, res)
    })
    res.send('Work!');
  }
}

export default user;
