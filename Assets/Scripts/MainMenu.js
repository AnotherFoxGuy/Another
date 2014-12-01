#pragma strict

var btnStartTexture : Texture;
var btnMenuTexture : Texture;
var btnExitTexture : Texture;



function OnGUI () {
  GUI.Box (Rect (50,50,Screen.width/4,Screen.height-100), "Another\nthe game");
  if (GUI.Button(Rect(100,Screen.height-240,Screen.width/5,50),"Start game")){
    Application.LoadLevel(1);
  }
  if (GUI.Button(Rect(100,Screen.height-170,Screen.width/5,50),"Quit")){
    Application.Quit();
  }
}
