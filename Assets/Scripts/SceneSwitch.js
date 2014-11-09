#pragma strict

public var LoadScene : String;
public var TextBoxText : String;

private var ShowTextBox = false;
private var CanLoadLevel = false;

@script RequireComponent (Collider)


function OnTriggerEnter(){
  ShowTextBox = true;
  var gos : GameObject[];
  gos = GameObject.FindGameObjectsWithTag("Key");
  if (gos.length == 0) {
      CanLoadLevel = true;
  }
}
function OnTriggerExit(){
  ShowTextBox = false;

}

function OnGUI () {
  if (ShowTextBox){
    if (!CanLoadLevel){
    GUI.Box (Rect (Screen.width/2,Screen.height/2,200,150), "You haven't found all keys yet!");
    }
    else{
    GUI.Box (Rect (Screen.width/2,Screen.height/2,200,150), TextBoxText);
    }
  }
}
function Update(){
  if (CanLoadLevel){
    if(ShowTextBox && Input.GetButtonDown("Submit")){
      print("LoadLevel "+LoadScene);
      Application.LoadLevel (LoadScene);
    }
  }
}
