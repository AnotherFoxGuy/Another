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
		//Screen.showCursor = !Screen.showCursor;
	}
}

function OnGUI () {
	if(GUIText.enabled){
		Time.timeScale = 0;
		GUI.Label (Rect (Screen.width/2,Screen.height/2-40,80,20),"Quit ?");
		if (Input.GetButtonDown("Submit")) {
			Application.Quit();
		}
	}
	else{
		Time.timeScale = 1;
	}
}
