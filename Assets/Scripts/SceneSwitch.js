#pragma strict

public var LoadScene : String;
public var TextBoxText : String;

private var ShowTextBox = false;

@script RequireComponent (Collider)


function OnTriggerEnter(){
  ShowTextBox = true;
}
function OnTriggerExit(){
  ShowTextBox = false;
}

function OnGUI () {
  if (ShowTextBox){
    GUI.Box (Rect (Screen.width/2-100,Screen.height/2-75,200,150), TextBoxText);
  }
}
function Update(){
  if(ShowTextBox && Input.GetButtonDown("Submit")){
    print("Loading level: "+LoadScene);
    Application.LoadLevel (LoadScene);
  }
}
