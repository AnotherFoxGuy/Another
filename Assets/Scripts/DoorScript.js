#pragma strict

private var Called = true;

function Start () {
	var child = transform.GetChild(0);
	if(child.name != "Nokey"){
		child.hingeJoint.limits.max = 0;
	}
}

function OnTriggerEnter(player : Collider) {
	if(player.gameObject.tag == "Player"){
		var child = transform.GetChild(0);
		child.hingeJoint.motor.targetVelocity = 1000;
	}
}
function OnTriggerExit(player : Collider) {
	if(player.gameObject.tag == "Player"){
		var child = transform.GetChild(0);
		child.hingeJoint.motor.targetVelocity = -1000;
	}
}
