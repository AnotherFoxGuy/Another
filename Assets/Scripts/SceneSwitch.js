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
    GUI.Box (Rect (Screen.width/2,Screen.height/2,200,150), TextBoxText);
  }
}
function Update(){
  if(ShowTextBox && Input.GetButtonDown("Submit")){
      print("LoadLevel "+LoadScene);
      Application.LoadLevel (LoadScene);
    }
}
