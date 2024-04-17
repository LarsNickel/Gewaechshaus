function Vorhang () {
    while (pins.digitalReadPin(DigitalPin.P13) == 0) {
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
    }
    ContinuousServo.turn_off_motor(DigitalPin.P1)
    ContinuousServo.spin_one_way_with_speed(AnalogPin.P1, 50)
    basic.pause(2000)
    ContinuousServo.turn_off_motor(DigitalPin.P1)
}
function Helligkeit () {
    led.enable(true)
    serial.writeValue("Helligkeit", input.lightLevel())
    led.enable(false)
    return input.lightLevel()
}
function Feuchtigkeit () {
    feuchte = pins.analogReadPin(AnalogPin.P2)
    serial.writeValue("Feuchtigkeit", feuchte)
    return feuchte
}
function Pumpe () {
	
}
function Temperatur () {
    temp = 3 / 1023 * pins.analogReadPin(AnalogPin.P0) / 0.01
    serial.writeValue("Temperatur", temp)
    return temp
}
let temp = 0
let feuchte = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.digitalWritePin(DigitalPin.P10, 0)
led.enable(false)
let lumi = 0
feuchte = 0
temp = 0
basic.forever(function () {
    if (Temperatur() >= 21) {
        pins.digitalWritePin(DigitalPin.P10, 1)
    } else {
        if (Temperatur() <= 20) {
            pins.digitalWritePin(DigitalPin.P10, 0)
        }
    }
})
