#pragma strict

/*
var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Key");
if (gos.length == 2 && !RenderSettings.fog) {
RenderSettings.fog = true;
RenderSettings.ambientLight = Color.black;
}

*/

@ script RequireComponent(Projector)
@ script AddComponentMenu("EasterEggs/Projector EasterEgg")

public var FireMat: Material;

private var Lamps: GameObject[];
private var FireProgress = 0;
private var ClasicProgress = 0;
private var CheatDelay = 0f;
private var WorldManagerProjector: Projector;

function Start() {
	Lamps = GameObject.FindGameObjectsWithTag("Lamps");
	WorldManagerProjector = this.GetComponent(Projector);
}

function Update() {
	if (CheatDelay > 0.0) {
		CheatDelay -= Time.deltaTime;
		if (CheatDelay <= 0.0) {
			CheatDelay = 0.0;
			ClasicProgress = 0;
			FireProgress = 0;
		}
	}
	if (FireProgress == 0 && Input.GetKeyDown('f')) {
		++FireProgress;
		CheatDelay = 1.0;
	}
	else if (FireProgress == 1 && Input.GetKeyDown('i')) {
		++FireProgress;
		CheatDelay = 1.0;
	}
	else if (FireProgress == 2 && Input.GetKeyDown('r')) {
		++FireProgress;
		CheatDelay = 1.0;
	}
	else if (FireProgress == 3 && Input.GetKeyDown('e')) {
		FireProgress = 0;
		WorldManagerProjector.material = FireMat;
		WorldManagerProjector.enabled = !WorldManagerProjector.enabled;
	}
	if (ClasicProgress == 0 && Input.GetKeyDown('o')) {
		++ClasicProgress;
		CheatDelay = 1.0;
	}
	else if (ClasicProgress == 1 && Input.GetKeyDown('g')) {
		++ClasicProgress;
		CheatDelay = 1.0;
	}
	else if (ClasicProgress == 2 && Input.GetKeyDown('r')) {
		++ClasicProgress;
		CheatDelay = 1.0;
	}
	 else if (ClasicProgress == 3 && Input.GetKeyDown('e')) {
		ClasicProgress = 0;
		Application.LoadLevel ("InsideORG");
	}
}
