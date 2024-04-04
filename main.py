def macheEtwas(num: number):
    pass
def Vorhang():
    while pins.digital_read_pin(DigitalPin.P13) == 0:
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
    ContinuousServo.turn_off_motor(DigitalPin.P1)
    ContinuousServo.spin_one_way_with_speed(AnalogPin.P1, 50)
    basic.pause(2000)
    ContinuousServo.turn_off_motor(DigitalPin.P1)
def Helligkeit():
    led.enable(True)
    serial.write_value("Helligkeit", input.light_level())
    return input.light_level()
def Feuchtigkeit():
    global feuchte
    feuchte = pins.analog_read_pin(AnalogPin.P2)
    serial.write_value("Feuchtigkeit", feuchte)
def Pumpe():
    pass
feuchte = 0
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
lumi = 0
led.enable(False)

def on_forever():
    Helligkeit()
    Feuchtigkeit()
    Vorhang()
    macheEtwas(1)
basic.forever(on_forever)
