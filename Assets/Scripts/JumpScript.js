#pragma strict

@script RequireComponent (BoxCollider)
@script RequireComponent (AudioSource)

public var AddForceTo : Vector3;
private var Triggered = false;

function OnTriggerEnter(obj : Collider){
	//print("@"+obj.tag);
	var AddForceToTMP = transform.TransformDirection(AddForceTo);
	if (!Triggered && obj.tag == "Player"){
		rigidbody.AddForce (AddForceToTMP);
		//  print("trigger");
		Triggered = true;
		audio.Play();
	}
}
