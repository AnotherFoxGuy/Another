#pragma strict

/*
var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Key");
if (gos.length == 2 && !RenderSettings.fog) {
RenderSettings.fog = true;
RenderSettings.ambientLight = Color.black;
}

*/

@script RequireComponent (Projector)
@script AddComponentMenu ("WorldManager/WorldManager Projector")

public var FireMat: Material;
public var TestMat: Material;

private var  Lamps : GameObject[];
private var FireProgress = 0;
private var CheatProgress = 0;
private var CheatDelay = 0f;
private var WorldManagerProjector: Projector;


function Start () {
  Lamps = GameObject.FindGameObjectsWithTag("Lamps");
  WorldManagerProjector = this.GetComponent(Projector);
}

function Update () {
  if(CheatDelay > 0.0){
    CheatDelay -= Time.deltaTime;
    if(CheatDelay <= 0.0){
      CheatDelay = 0.0;
      CheatProgress = 0;
    }
  }
  if(FireProgress == 0 && Input.GetKeyDown('f')){
    ++FireProgress; CheatDelay = 1.0;
  } else if(FireProgress == 1 && Input.GetKeyDown('i')){
    ++FireProgress; CheatDelay = 1.0;
  } else if(FireProgress == 2 && Input.GetKeyDown('r')){
    ++FireProgress; CheatDelay = 1.0;
  } else if(FireProgress == 3 && Input.GetKeyDown('e')){
    FireProgress = 0;
    WorldManagerProjector.material = FireMat;
    WorldManagerProjector.enabled = !WorldManagerProjector.enabled;
  }
  if(CheatProgress == 0 && Input.GetKeyDown('g')){
    ++CheatProgress; CheatDelay = 1.0;
  } else if(CheatProgress == 1 && Input.GetKeyDown('r')){
    ++CheatProgress; CheatDelay = 1.0;
  } else if(CheatProgress == 2 && Input.GetKeyDown('e')){
    ++CheatProgress; CheatDelay = 1.0;
  } else if(CheatProgress == 3 && Input.GetKeyDown('n')){
    CheatProgress = 0;
    WorldManagerProjector.material = TestMat;
    WorldManagerProjector.enabled = !WorldManagerProjector.enabled;
  }
}
