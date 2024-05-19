const deleteOldToken = require('./deleteOldToken')

const tasks = [ deleteOldToken ]

function weeklyTasks () {
  setInterval(() => {
    weeklyTasks.forEach(task => {
      task.run()
    })
  }, 1000 * 60 * 60 * 24 * 7)
}

module.exports = { weeklyTasks }
