#include <WiFi.h>
#include <WebSocketsClient.h>

/* 学校で使うときはPCからテザリングしないといけないかも */
const char* ssid = "";
const char* password = "";

const int input_pin = 32;

int prev = 0;

void setup() {
  pinMode(input_pin, ANALOG);
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("connected!");
}

void loop() {
  //Serial.println("awake");
  int num = log2(analogRead(input_pin) + 1) / 2;
  if (num != prev) {
    prev = num;
    if(num != 0) Serial.println(num);
  }
  delay(10000);
}
