radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber != 500) {
        if (Math.floor(receivedNumber / 10) == shipHead.get(LedSpriteProperty.X) && Math.floor(receivedNumber % 10) == shipHead.get(LedSpriteProperty.Y) || Math.floor(receivedNumber / 10) == shipTail.get(LedSpriteProperty.X) && Math.floor(receivedNumber % 10) == shipTail.get(LedSpriteProperty.Y)) {
            hits += 1
            if (hits == 2) {
                radio.sendValue("hit", 2)
                basic.showString("You Lose")
            } else {
                radio.sendValue("hit", 1)
                basic.showString("hit")
            }
        } else {
            radio.sendValue("miss", 1)
            basic.showString("miss")
        }
        sending = true
        selectorX = 2
        selectorY = 2
        game.pause()
        drawSelector()
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 54, 54, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        if (shipHead.get(LedSpriteProperty.Y) == 4) {
            shipHead.set(LedSpriteProperty.Y, 0)
        } else {
            shipHead.change(LedSpriteProperty.Y, 1)
        }
    } else if (mode == 1) {
        tailPosArrayCounter += 1
        if (tailPosArrayCounter > tailSpotsX.length - 1) {
            tailPosArrayCounter = 0
        }
        shipTail.set(LedSpriteProperty.X, tailSpotsX[tailPosArrayCounter])
        shipTail.set(LedSpriteProperty.Y, tailSpotsY[tailPosArrayCounter])
    } else if (mode == 3 && sending == true) {
        if (selectorY == 4) {
            selectorY = 0
        } else {
            selectorY += 1
        }
        drawSelector()
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (mode == 0) {
        mode = 1
        tailStartPos = shipHead.get(LedSpriteProperty.Y) - 1
        if (tailStartPos == -1) {
            tailStartPos += 2
        }
        shipTail = game.createSprite(shipHead.get(LedSpriteProperty.X), tailStartPos)
        shipTail.set(LedSpriteProperty.Direction, 45)
        tailSpotsX = []
        tailSpotsY = []
        if (shipHead.get(LedSpriteProperty.Y) - 1 >= 0) {
            tailSpotsX.push(shipHead.get(LedSpriteProperty.X))
            tailSpotsY.push(shipHead.get(LedSpriteProperty.Y) - 1)
        }
        if (shipHead.get(LedSpriteProperty.X) - 1 >= 0) {
            tailSpotsY.push(shipHead.get(LedSpriteProperty.Y))
            tailSpotsX.push(shipHead.get(LedSpriteProperty.X) - 1)
        }
        if (shipHead.get(LedSpriteProperty.Y) + 1 <= 4) {
            tailSpotsX.push(shipHead.get(LedSpriteProperty.X))
            tailSpotsY.push(shipHead.get(LedSpriteProperty.Y) + 1)
        }
        if (shipHead.get(LedSpriteProperty.X) + 1 <= 4) {
            tailSpotsY.push(shipHead.get(LedSpriteProperty.Y))
            tailSpotsX.push(shipHead.get(LedSpriteProperty.X) + 1)
        }
        tailPosArrayCounter = 0
    } else if (mode == 1) {
        mode += 1
        radio.sendString(readyMessage)
    } else if (mode == 3) {
        checkedPosX.push(selectorX)
        checkedPosY.push(selectorY)
        radio.sendNumber(selectorX * 10 + selectorY)
    }
})
input.onButtonPressed(Button.AB, function () {
	
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ready1") {
        gotRadioMessage = true
        readyMessage = "ready2"
        playerNum = 2
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
        sending = false
    }
    if (receivedString == "ready2") {
        gotRadioMessage = true
        game.pause()
        basic.clearScreen()
        selectorX = 2
        selectorY = 2
        led.plot(selectorX, selectorY)
        drawSelector()
    }
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        if (shipHead.get(LedSpriteProperty.X) == 4) {
            shipHead.set(LedSpriteProperty.X, 0)
        } else {
            shipHead.change(LedSpriteProperty.X, 1)
        }
    } else if (mode == 1) {
        tailPosArrayCounter += -1
        if (tailPosArrayCounter < 0) {
            tailPosArrayCounter = tailSpotsX.length - 1
        }
        shipTail.set(LedSpriteProperty.X, tailSpotsX[tailPosArrayCounter])
        shipTail.set(LedSpriteProperty.Y, tailSpotsY[tailPosArrayCounter])
    } else if (sending == true && mode == 3) {
        if (selectorX == 4) {
            selectorX = 0
        } else {
            selectorX += 1
        }
        drawSelector()
    }
})
function drawSelector () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    for (let index = 0; index <= checkedPosX.length - 1; index++) {
        led.plotBrightness(checkedPosX[index], checkedPosY[index], 56)
    }
    led.plot(selectorX, selectorY)
}
radio.onReceivedValue(function (name, value) {
    if (name == "hit") {
        if (value == 1) {
            basic.showString("hit")
        } else {
            basic.showString("You Win!")
            game.pause()
        }
    } else {
        basic.showString("miss")
    }
    sending = false
    game.resume()
})
let gameOn = false
let gotRadioMessage = false
let tailSpotsY: number[] = []
let tailSpotsX: number[] = []
let hits = 0
let shipTail: game.LedSprite = null
let checkedPosY: number[] = []
let checkedPosX: number[] = []
let readyMessage = ""
let shipHead: game.LedSprite = null
let sending = false
let tailPosArrayCounter: number;
let tailStartPos: number;
let selectorX: number;
let selectorY: number;
let playerNum: number;
let mode: number;
sending = true
music.setBuiltInSpeakerEnabled(true)
radio.setGroup(177)
radio.sendNumber(500)
shipHead = game.createSprite(2, 2)
mode = 0
readyMessage = "ready1"
playerNum = 1
checkedPosX = []
checkedPosY = []
basic.forever(function () {
    basic.pause(1000)
    if (gotRadioMessage) {
        if (mode == 2) {
            gameOn = true
            mode = 3
        }
    }
})
