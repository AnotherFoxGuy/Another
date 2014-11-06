#pragma strict

private var KeysFound = 0;
private var ShowTextBox = false;

function OnGUI () {
  GUI.Box (Rect (Screen.width - 250,100,200,100), "Key found "+KeysFound);
  if(ShowTextBox){
    GUI.Box (Rect (Screen.width/2,Screen.height/2,100,50), " Key ");
  }
}

function Update(){
  var ray = Camera.main.ScreenPointToRay (Vector3(Screen.width/2,Screen.width/2, 0));
  var hit : RaycastHit;
  //var otherObj :
  if (Physics.Raycast (ray, hit, 5))
  //Debug.DrawLine (ray.origin, hit.point);
    {
    if(hit.transform.tag == "Key"){
      //print("Hit key");
      ShowTextBox = true;
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
/*
function OnTriggerEnter(otherObj: Collider) {
  print("col @ "+otherObj);

    if (otherObj.transform.tag == "Key") {
        Destroy (otherObj.gameObject);
        KeysFound++;
    }
}

function Update() {
	var ray = Camera.main.ScreenPointToRay (Vector3(Screen.width/2,Screen.width/2, 0));
	var hit : RaycastHit;
	if (Physics.Raycast (ray, hit, 10)) {
		Debug.DrawLine (ray.origin, hit.point);
	}
}
*/
