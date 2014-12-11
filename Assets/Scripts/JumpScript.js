#pragma strict

@script RequireComponent (BoxCollider)
@script RequireComponent (AudioSource)

public var AddForceTo : Vector3;
private var Triggered = false;

function OnTriggerEnter(obj : Collider){
	var AddForceToTMP = transform.TransformDirection(AddForceTo);
	if (!Triggered && obj.tag == "Player"){
		rigidbody.AddForce (AddForceToTMP);
		Triggered = true;
		audio.Play();
	}
}
