#pragma strict

private var AmountKeysFound = 0;
private var ShowTextBox = false;
private var KeysFound = new Hashtable();
private var TextBoxText = "Door";

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
    else if(hit.transform.tag == "Door"){
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
      }
      if(hit.transform.tag == "Door"){
        if(KeysFound.ContainsValue(hit.collider.name))
          //Destroy (hit.collider.gameObject);
          hit.collider.rigidbody.AddForce (transform.TransformDirection(Vector3.forward*3000));
      }
    }
}

function OnGUI () {
  GUI.Box (Rect (10,10,100,50), "Key found "+AmountKeysFound);
  if(ShowTextBox){
    GUI.Box (Rect (Screen.width/2,Screen.height/2,100,50), TextBoxText);
  }
}
