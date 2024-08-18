const { exec } = require("child_process")

exec('find . -name ".DS_Store" -exec rm {} \\;', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`)
    return
  }
  console.log("All .DS_Store files deleted successfully from all folders.")
})
