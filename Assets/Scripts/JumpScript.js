#pragma strict

public var AddForceTo : Vector3;
private var Triggered = false;

function OnTriggerEnter(obj : Collider){
  //print("@"+obj.tag);
    if (!Triggered && obj.tag == "Player"){
    rigidbody.AddForce (AddForceTo);
  //  print("trigger");
    Triggered = true;
    audio.Play();
  }
}
