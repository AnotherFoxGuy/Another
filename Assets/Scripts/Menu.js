#pragma strict

private var ShowMenu = false;
private var GUIText : GUITexture;
private var Screenwidth = Screen.width/2;
private var Screenheight = Screen.height/2;

function Start () {
  GUIText = GetComponent(GUITexture);

}

function Update () {
  if(Input.GetButtonDown("Escape")){
    GUIText.enabled = !GUIText.enabled;

  }

}

function OnGUI () {
  if(GUIText.enabled){
      // Make a background box
      // Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
      if (GUI.Button (Rect (Screenwidth-50,Screenheight-50,80,20), "Resume")) {
        GUIText.enabled = !GUIText.enabled;
      }

      // Make the second button.
      if (GUI.Button (Rect (Screenwidth-50,Screenheight+50 ,80,20), "Quit")) {
         Application.Quit();
      }
  }
}
