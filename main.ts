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
    return input.lightLevel()
}
function Feuchtigkeit () {
    feuchte = pins.analogReadPin(AnalogPin.P2)
    serial.writeValue("Feuchtigkeit", feuchte)
}
function Pumpe () {
	
}
let feuchte = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
let lumi = 0
led.enable(false)
basic.forever(function () {
    Helligkeit()
    Feuchtigkeit()
    Vorhang()
})
