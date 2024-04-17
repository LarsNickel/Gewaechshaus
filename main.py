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
    led.enable(False)
    return input.light_level()
def Feuchtigkeit():
    global feuchte
    feuchte = pins.analog_read_pin(AnalogPin.P2)
    serial.write_value("Feuchtigkeit", feuchte)
def Pumpe():
    pass
feuchte = 0
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
pins.digital_write_pin(DigitalPin.P10, 0)
led.enable(False)
lumi = 0
feuchte = 0

def on_forever():
    Vorhang()
basic.forever(on_forever)

def on_forever2():
    while input.button_is_pressed(Button.A):
        ContinuousServo.spin_one_way_with_speed(AnalogPin.P1, 50)
    ContinuousServo.turn_off_motor(DigitalPin.P1)
basic.forever(on_forever2)

def on_forever3():
    while input.button_is_pressed(Button.B):
        ContinuousServo.spin_other_way_with_speed(AnalogPin.P1, 50)
    ContinuousServo.turn_off_motor(DigitalPin.P1)
basic.forever(on_forever3)
