#pragma strict

@script RequireComponent (Light)

private var FlashLight : Light;

function Start (){
    FlashLight = GetComponent(Light);
}

function Update (){
    if(Input.GetButtonDown("FlashLight")){
        FlashLight.enabled = !FlashLight.enabled;
    }
}
