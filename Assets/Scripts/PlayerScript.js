#pragma strict

private var KeysFound = 0;
private var ShowTextBox = false;

function OnGUI () {
  GUI.Box (Rect (10,10,100,50), "Key found "+KeysFound);
  if(ShowTextBox){
    GUI.Box (Rect (Screen.width/2,Screen.height/2,100,50), " Key ");
  }
}

function Update(){
  var ray = Camera.main.transform.position;
  var hit : RaycastHit;
  var tmpPos = Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z);
  //var otherObj :
  if (Physics.Raycast (tmpPos,transform.TransformDirection(Vector3.forward), hit, 5)){
  Debug.DrawLine (tmpPos, hit.point);
    if(hit.transform.tag == "Key"){
      //print("Hit key");
      ShowTextBox = true;
    }
    else{
      ShowTextBox = false;
    }
  }
  else{
    ShowTextBox = false;
  }

if(ShowTextBox && Input.GetButtonDown("Submit")){
    if(hit.transform.tag == "Key"){
    print("Found a key");
    Destroy (hit.collider.gameObject);
    KeysFound++;
  }
}
}
