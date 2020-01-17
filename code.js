let Gefahr = 0
let Geschwindigkeit = 0
input.onButtonPressed(Button.A, () => {
    beschleunige()
})
input.onButtonPressed(Button.B, () => {
    bremse()
})
function beschleunige()  {
    if (Geschwindigkeit < 5) {
        Geschwindigkeit += 1
    }
}
function bremse()  {
    if (Geschwindigkeit > 0) {
        Geschwindigkeit += -1
    }
}
radio.onDataPacketReceived( ({ receivedNumber: GeschwindigkeitDerAnderen }) =>  {
    if (GeschwindigkeitDerAnderen < 2) {
        Gefahr = 1
    }
})
function warne()  {
    basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . . . .
        . . # . .
        `)
    music.ringTone(262)
}
Geschwindigkeit = 5
Gefahr = 0
basic.forever(() => {
    if (Gefahr) {
        warne()
    } else {
        basic.showNumber(Geschwindigkeit)
    }
    radio.sendNumber(Geschwindigkeit)
    basic.pause(1000)
})
