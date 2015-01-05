#pragma strict

private var LoadingScreen: GameObject;
private var LoadingScreenGUIText : GUITexture;

function Start() {
	LoadingScreen = GameObject.Find("ZZZZZ_LoadingScreen");
	LoadingScreenGUIText = LoadingScreen.GetComponent(GUITexture);
}
/*
function OnGUI () {
	if(!GUIText.enabled ){
		GUI.Box (Rect (50,50,Screen.width/4,Screen.height-100), "Another");
		if (GUI.Button(Rect(100,Screen.height-240,Screen.width/5,50),"Start game")){
			GUIText.enabled = true;
			Application.LoadLevel(1);
		}
		if (GUI.Button(Rect(100,Screen.height-170,Screen.width/5,50),"Quit")){
			Application.Quit();
		}
	}
}
*/

function StartGame () {
	LoadingScreenGUIText.enabled = true;
	Application.LoadLevel(1);
}

function ExitGame(){
	Application.Quit();
}
