input.onButtonPressed(Button.A, function () {
    mode_flag = 0
})
function Licht (num: number) {
    if (num <= 50) {
        pins.digitalWritePin(DigitalPin.P9, 1)
    } else {
        if (num >= 70) {
            pins.digitalWritePin(DigitalPin.P9, 0)
        }
    }
}
function Luefter (num: number) {
    led.enable(false)
    if (num >= 25) {
        pins.digitalWritePin(DigitalPin.P10, 1)
    } else {
        if (num <= 22) {
            pins.digitalWritePin(DigitalPin.P10, 0)
        }
    }
}
function Vorhang (num: number) {
    if (num >= 230 && vorhang_oben == 1) {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P1, 50)
        basic.pause(2000)
        ContinuousServo.turn_off_motor(DigitalPin.P1)
        vorhang_oben = 0
    } else {
        if (num <= 75) {
            while (pins.digitalReadPin(DigitalPin.P13) == 0) {
                ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
            }
            ContinuousServo.turn_off_motor(DigitalPin.P1)
            vorhang_oben = 1
        }
    }
}
function Helligkeit () {
    led.enable(true)
    lumi = input.lightLevel()
    serial.writeValue("Helligkeit", lumi)
    basic.pause(100)
    led.enable(false)
    return lumi
}
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P10, 0)
    mode_flag = 1
})
function Feuchtigkeit () {
    feuchte = pins.analogReadPin(AnalogPin.P2)
    return feuchte
}
function Vorhang_init () {
    while (pins.digitalReadPin(DigitalPin.P13) == 0) {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
    }
    ContinuousServo.turn_off_motor(DigitalPin.P1)
    vorhang_oben = 1
}
function Pumpe (num: number) {
    if (num >= 380) {
        pins.digitalWritePin(DigitalPin.P8, 1)
    } else {
        if (num < 380) {
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
    }
}
function Temperatur () {
    temp = 3 / 1023 * pins.analogReadPin(AnalogPin.P0) / 0.01
    serial.writeValue("Temperatur", temp)
    return temp
}
let mode_flag = 0
let vorhang_oben = 0
let temp = 0
let feuchte = 0
let lumi = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.digitalWritePin(DigitalPin.P10, 0)
led.enable(false)
lumi = 0
feuchte = 0
temp = 0
vorhang_oben = 0
mode_flag = 0
Vorhang_init()
basic.forever(function () {
    Pumpe(Feuchtigkeit())
    if (mode_flag == 0) {
        Luefter(Temperatur())
    }
    if (mode_flag == 1) {
        Vorhang(Helligkeit())
        Licht(Helligkeit())
    }
})
