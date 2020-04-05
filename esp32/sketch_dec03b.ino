

/*Program to use GATT service on ESP32 to send Battery Level
 * ESP32 works as server - Mobile as client
 * Program by: B.Aswinth Raj
 * Dated on: 13-10-2018
 * Website: www.circuitdigest.com
 */

 
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h> //Library to use BLE as server
#include <BLE2902.h> 
#include <ESP32Servo.h>

#define BUILTIN 2
#define INFO 14
#define WARN 27
#define SUCCESS 26
#define N_DATA 2

Servo servo1;
Servo servo2;
 

bool _BLEClientConnected = false;
String value = "toto";

unsigned int i = 0;

String sx = "";
String sy = "";
int x = 0;
int y = 0;
int lastX = 0;
int lastY = 0;
int deltaX = 0;
int deltaY = 0;
int temp = 0;

int cmt = 10;

bool virg = false;
String data = "";

#define HIDservice BLEUUID((uint16_t)0x1812) 
// 0x180D -> hearth rate
BLECharacteristic HIDCharacteristicTX(BLEUUID((uint16_t)0x2A19), BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY);
BLECharacteristic HIDCharacteristicRX(BLEUUID((uint16_t)0x2A3D), BLECharacteristic::PROPERTY_WRITE);

BLEDescriptor Descriptor(BLEUUID((uint16_t)0x2901));

void hintLed(int w = 100, int n = 1, int pinout = BUILTIN) {
  for(int i = 0;i < n;i++) {
    digitalWrite(pinout, HIGH);
    delay(w);
    digitalWrite(pinout, LOW);
    delay(w);
  }
}

class MyServerCallbacks : public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      _BLEClientConnected = true;
      hintLed(500,2, SUCCESS);
      digitalWrite(BUILTIN, HIGH);
    };
    void onDisconnect(BLEServer* pServer) {
      _BLEClientConnected = false;
      hintLed(200,4, WARN);
      digitalWrite(BUILTIN, LOW);
    };
};

class CharacteristicCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string rxValue = pCharacteristic->getValue();
   
    // hintLed(200,1, SUCCESS);
    if (rxValue.length() > 0) {
        value = "";
        for (int i = 0; i < rxValue.length(); i++) {
          Serial.print(rxValue[i]);
          value += rxValue[i];
        }
      }
      hintLed(100,2,SUCCESS);
      String scoreStr = String(value);
     
      HIDCharacteristicTX.setValue(scoreStr.c_str());
      HIDCharacteristicTX.notify();
    }
    
};

void InitBLE() {
  BLEDevice::init("TrickyRoad");
  
  // Create the BLE Server
  BLEServer *pServer = BLEDevice::createServer();
  
  pServer->setCallbacks(new MyServerCallbacks());

  // Create the BLE Service
  BLEService *pBattery = pServer->createService(HIDservice);
  
  // ************** TX ***************

  pBattery->addCharacteristic(&HIDCharacteristicTX);
  
  Descriptor.setValue("TrickyRoad_Score");
  HIDCharacteristicTX.addDescriptor(&Descriptor);
  
  HIDCharacteristicTX.addDescriptor(new BLE2902());

  // ************** RX ***************
  
  pBattery->addCharacteristic(&HIDCharacteristicRX);
  
  HIDCharacteristicRX.setCallbacks(new CharacteristicCallbacks());

  pServer->getAdvertising()->addServiceUUID(HIDservice);

  pBattery->start();
  // Start advertising
  pServer->getAdvertising()->start();
}

void setup() {
  Serial.begin(115200);

  Serial.println("Tricky Road");
  
  pinMode(BUILTIN, OUTPUT);
  pinMode(INFO, OUTPUT);
  pinMode(WARN, OUTPUT);
  pinMode(SUCCESS, OUTPUT);

  servo1.attach(13);
  servo2.attach(12); 
  
  InitBLE();
}

String okValue = "ok";
String totoValue = "toto";
int score = 3442;

void loop() {
  // HIDCharacteristicTX.setValue(score.c_str());

  int piezo = abs(analogRead(25));

  if(piezo > 500) {
    digitalWrite(INFO, HIGH);
  } else {
    digitalWrite(INFO, LOW);
  }
  
  if(_BLEClientConnected) {
    // score = score + 1;
    // String scoreStr = String(score);

    // HIDCharacteristicTX.setValue(scoreStr.c_str());
    // HIDCharacteristicTX.setValue(score, 1);
    // HIDCharacteristicTX.notify();
    
    data = value;
    i = 0;
    sx = "";
    sy = "";
    virg = false;
    
    while(i < data.length()) {
      if(data[i] == ',') virg = true;
      else {
        if(virg) sy += data[i];
        else sx += data[i];
      }
      i++;
    }
  
    x = sx.toInt();
    y = sy.toInt();

    if(virg && x >= 0 && x <= 180 && y >= 0 && y <= 180) {
      servo1.write(x);
      servo2.write(y);
    
      deltaX = x - lastX;
      deltaY = y - lastY;
    
      if(deltaX > deltaY) temp = abs(deltaX);
      else temp = abs(deltaY);
    
      // temp = temp * 1.8;
      
      lastX = x;
      lastY = y;
      delay(temp);
    }
  }
}
