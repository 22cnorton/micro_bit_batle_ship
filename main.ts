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
    }
})
input.onButtonPressed(Button.AB, function () {
	
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ready1") {
        gotRadioMessage = true
        readyMessage = "ready2"
        playerNum = 2
    }
    if (receivedString == "ready2") {
        gotRadioMessage = true
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
    }
})
radio.onReceivedValue(function (name, value) {
	
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
    }
})
let gameOn = false
let tailStartPos = 0
let gotRadioMessage = false
let tailSpotsY: number[] = []
let shipTail: game.LedSprite = null
let tailSpotsX: number[] = []
let tailPosArrayCounter = 0
let playerNum = 0
let readyMessage = ""
let mode = 0
let shipHead: game.LedSprite = null
let sending = true
music.setBuiltInSpeakerEnabled(true)
radio.setGroup(177)
radio.sendNumber(0)
shipHead = game.createSprite(2, 2)
mode = 0
readyMessage = "ready1"
playerNum = 1
basic.forever(function () {
    basic.pause(1000)
    if (gotRadioMessage) {
        if (mode == 2) {
            gameOn = true
            mode += 1
        }
        if (playerNum == 2) {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
            sending = false
        }
    }
})
