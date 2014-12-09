#pragma strict

private var ShowMenu = false;
private var GUIText : GUITexture;
private var Screenwidth = Screen.width/2;
private var Screenheight = Screen.height/2;

function Start () {
	GUIText = GetComponent(GUITexture);
	Screen.showCursor = false;

}

function Update () {
	if(Input.GetButtonDown("Escape")){
		GUIText.enabled = !GUIText.enabled;
		Screen.showCursor = !Screen.showCursor;
	}
}

function OnGUI () {
	if(GUIText.enabled){
		GUI.Label (Rect (Screen.width/2,Screen.height/2-40,80,20),"Quit ?");

		if (GUI.Button (Rect (Screen.width/2+50,Screen.height/2,80,20), "No")) {
			GUIText.enabled = !GUIText.enabled;
			Screen.showCursor = !Screen.showCursor;
		}
		if (GUI.Button (Rect (Screen.width/2-50,Screen.height/2,80,20), "Yes") || Input.GetButtonDown("Submit")) {
			Application.Quit();
		}
	}
}
