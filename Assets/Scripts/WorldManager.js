#pragma strict

/*
var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Key");
if (gos.length == 2 && !RenderSettings.fog) {
RenderSettings.fog = true;
RenderSettings.ambientLight = Color.black;
}

*/

private var  Lamps : GameObject[];


function Start () {
  Lamps = GameObject.FindGameObjectsWithTag("Lamps");
}

function Update () {
}
