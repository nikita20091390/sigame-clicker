const iohook = require('iohook'),
      robot = require('robotjs'),
      chalk = require('chalk'),
      toggleKeyChar = 192, // tilda button on keyboard
      targetColor = 'ffffff'

let isToggled = false

function setIsToggled (value) {
  isToggled = value
  console.log(isToggled ? chalk.greenBright('Enabled') : chalk.yellowBright('Disabled'))
}

iohook.on('keypress', event => {
  if (event.rawcode === toggleKeyChar) {
    setIsToggled(!isToggled)
  }
})

iohook.start()

console.log(chalk.blueBright('Clicker initial started successfully'))

setInterval(() => {
  if (isToggled) {
    const {x, y} = robot.getMousePos(),
          pixelColor = robot.getPixelColor(x, y)

    if (pixelColor === targetColor) {
      robot.mouseClick('right')
      console.log(chalk.cyan('RMB click triggered'))
      setIsToggled(false)
    }
  }
}, 100)

