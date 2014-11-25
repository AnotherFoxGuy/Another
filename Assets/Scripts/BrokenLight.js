#pragma strict

@script RequireComponent (Light)
@script AddComponentMenu ("Light/Broken Light")

public var TimeDelayOn = 1f;
public var TimeDelayOff = 0.5f;

private var BrokenLight : Light;
private var LightTimer = 1f;

function Start (){
  BrokenLight = GetComponent(Light);
}

function Update (){
  if(Time.time >= LightTimer){
    if(BrokenLight.enabled){
      LightTimer = Time.time + Random.Range(0, TimeDelayOn);
    }
    else{
      LightTimer = Time.time + Random.Range(0, TimeDelayOff);
    }
    BrokenLight.enabled = !BrokenLight.enabled;
  }
}
