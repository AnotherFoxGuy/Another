#pragma strict

public var LoadScene : String;
public var ButtonText : String;

private var ShowButton = false;

@script RequireComponent (Collider)


function OnTriggerEnter(){
  ShowButton = true;

}
function OnTriggerExit(){
  ShowButton = false;

}

function OnGUI () {
  if (ShowButton){
    // Make a background box
    //GUI.Box (Rect (10,10,100,90), "Loader Menu");

    // Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
    if (GUI.Button (Rect (Screen.width/3,Screen.height/3,Screen.width/3,Screen.height/3), ButtonText)) {
        Application.LoadLevel (LoadScene);
    }
  }
}
