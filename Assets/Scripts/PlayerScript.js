#pragma strict

private var AmountKeysFound = 0;
private var ShowTextBox = false;
private var KeysFound = new Hashtable();
private var TextBoxText = "Door";
private var invtext = "";


function Start () {
  KeysFound.Add(AmountKeysFound,"Nokey");
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
      TextBoxText = "Key";
    }
    else if(hit.transform.tag == "Door" && hit.transform.hingeJoint.limits.max == 0){
      //print("Hit key");
      ShowTextBox = true;
      if(KeysFound.ContainsValue(hit.collider.name)){
        TextBoxText = "Open Door";
      }
      else{
        TextBoxText = "No key";
      }
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
      AmountKeysFound++;
      KeysFound.Add(AmountKeysFound,hit.collider.name);
      invtext+=hit.collider.name+"\n";
    }
    if(hit.transform.tag == "Door"){
      if(KeysFound.ContainsValue(hit.collider.name)){
        hit.transform.hingeJoint.limits.max = 90;
      }
    }
  }
}

function OnGUI () {
  GUI.Box (Rect (10,10,100,50), "Key found "+AmountKeysFound);
  if(ShowTextBox){
    GUI.Box (Rect (Screen.width/2-50,Screen.height/2-25,100,50), TextBoxText);
  }
  if(Input.GetButton("Inventory")){
    GUI.Box (Rect (Screen.width/2-250,Screen.height/2-250,500,500), invtext);
  }
}
