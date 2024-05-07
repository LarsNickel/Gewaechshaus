function Vorhang (num: number) {
    if (num >= 130) {
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P1, 50)
        basic.pause(2000)
        ContinuousServo.turn_off_motor(DigitalPin.P1)
    } else {
        if (num <= 75) {
            while (pins.digitalReadPin(DigitalPin.P13) == 0) {
                ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
            }
            ContinuousServo.turn_off_motor(DigitalPin.P1)
        }
    }
}
function Helligkeit () {
    led.enable(true)
    lumi = input.lightLevel()
    serial.writeValue("Helligkeit", lumi)
    led.enable(false)
    return lumi
}
function Feuchtigkeit () {
    feuchte = pins.analogReadPin(AnalogPin.P2)
    return feuchte
}
function Vorhang_init () {
    while (pins.digitalReadPin(DigitalPin.P13) == 0) {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
    }
    ContinuousServo.turn_off_motor(DigitalPin.P1)
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
    return temp
}
let temp = 0
let feuchte = 0
let lumi = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.digitalWritePin(DigitalPin.P10, 0)
led.enable(false)
lumi = 0
feuchte = 0
temp = 0
Vorhang_init()
basic.forever(function () {
    if (Temperatur() >= 25) {
        pins.digitalWritePin(DigitalPin.P10, 1)
    } else {
        if (Temperatur() <= 22) {
            pins.digitalWritePin(DigitalPin.P10, 0)
        }
    }
    Pumpe(Feuchtigkeit())
    Vorhang(Helligkeit())
})
