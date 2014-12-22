#pragma strict

public var LoadScene : String;
public var TextBoxText : String;


private var LoadingScreen: GameObject;
private var GUIText : GUITexture;
private var ShowTextBox = false;

@script RequireComponent (Collider)

function Start() {
	LoadingScreen = GameObject.Find("ZZZZZ_LoadingScreen");
	GUIText = LoadingScreen.GetComponent(GUITexture);
}

function OnTriggerEnter (player : Collider) {
	if(player.gameObject.tag == "Player")
		ShowTextBox = true;
}
function OnTriggerExit(player : Collider){
	if(player.gameObject.tag == "Player")
		ShowTextBox = false;
}

function OnGUI () {
	if (ShowTextBox){
		GUI.Box (Rect (Screen.width/2-100,Screen.height/2-75,200,150), TextBoxText);
	}
}
function Update(){
	if(ShowTextBox && Input.GetButtonDown("Submit")){
		ShowTextBox = false;
		print("Loading level: "+LoadScene);
		GUIText.enabled = true;
		Application.LoadLevel (LoadScene);
	}
}
