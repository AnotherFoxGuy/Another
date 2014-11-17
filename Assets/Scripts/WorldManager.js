#pragma strict


function Start () {

}

function Update () {
  var gos : GameObject[];
  gos = GameObject.FindGameObjectsWithTag("Key");
  if (gos.length == 2 && !RenderSettings.fog) {
      RenderSettings.fog = true;
      RenderSettings.ambientLight = Color.black;
  }
}
