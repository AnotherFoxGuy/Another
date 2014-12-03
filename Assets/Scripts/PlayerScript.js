#pragma strict

public var StartWithFlashlight = false;
public var StartWithBattery = false;

private var AmountInventory = 0;
private var Batterys = 0;
private var BatteryPower = 0f;
private var ShowTextBox = false;
private var TextBoxText = "Sample Text";
private var invtext = "";
private var CanUseFlashLight = false;
private var FlashLight : Light;
private var Inventory = new Hashtable ();
private var InventoryArr = new Array ();


function Start () {
  FlashLight = GetComponent(Light);
  Inventory.Add("Nokey",InventoryArr.length);
  if (StartWithFlashlight)
    CanUseFlashLight = true;
  if(StartWithBattery)
    BatteryPower = 100f;
}

function Update(){
  var ray = Camera.main.transform.position;
  var hit : RaycastHit;
  var tmpPos = Vector3(this.transform.position.x, this.transform.position.y, this.transform.position.z);
  if (Physics.Raycast (tmpPos,transform.TransformDirection(Vector3.forward), hit, 5)){
  Debug.DrawLine (tmpPos, hit.point);
    if(hit.transform.tag == "Key" || hit.transform.tag == "FlashLight" ||  hit.transform.tag == "Battery"){
      ShowTextBox = true;
      TextBoxText = hit.collider.name;
    }
    else if(hit.transform.tag == "Door" && hit.transform.hingeJoint.limits.max == 0){
      ShowTextBox = true;
      if(Inventory.ContainsKey(hit.collider.name)){
        TextBoxText = "Open Door";
      }
      else{
        TextBoxText = "No key";
      }
    }
    else if (hit.transform.tag == "ClosetDoor"){
      ShowTextBox = true;
      if(hit.transform.hingeJoint.motor.targetVelocity != 1000){
        TextBoxText = "Open Closet Door";
      }
      else{
        TextBoxText = "Close Closet Door";
      }
    }
    else{
      ShowTextBox = false;
    }
  }
  else{
    ShowTextBox = false;
  }
  if(Input.GetButtonDown("FlashLight") && CanUseFlashLight && StartWithFlashlight){
    FlashLight.enabled = !FlashLight.enabled;
  }
  if(Input.GetButtonDown("Recharge") && Batterys > 0 && BatteryPower < 99){
    BatteryPower = 100;
    CanUseFlashLight = true;
    var tmp = 0; tmp = Inventory["Battery"+Batterys]; tmp--;
    InventoryArr.RemoveAt(tmp);
    Inventory.Remove("Battery"+Batterys);
    Batterys--;
    IndexInventory();
  }
  if(FlashLight.enabled){
    var tmpdt =  Time.deltaTime*1;
    BatteryPower-=tmpdt;
  }
  if(BatteryPower <= 0){
    CanUseFlashLight = false;
    FlashLight.enabled = false;
  }
  if(ShowTextBox && Input.GetButtonDown("Submit")){
    if(hit.transform.tag == "Key"){
      Destroy (hit.collider.gameObject);
      InventoryArr.Push(hit.collider.name);
      Inventory.Add(hit.collider.name,InventoryArr.length);
      IndexInventory();
    }
    else if(hit.transform.tag == "FlashLight"){
      Destroy (hit.collider.gameObject);
      StartWithFlashlight =true;
      InventoryArr.Push(hit.collider.name);
      Inventory.Add(hit.collider.name,InventoryArr.length);
      IndexInventory();
    }
    else if(hit.transform.tag == "Battery"){
      Destroy (hit.collider.gameObject);
      InventoryArr.Push(hit.collider.name);
      Batterys++;
      Inventory.Add("Battery"+Batterys,InventoryArr.length);
      IndexInventory();
    }
    else if(hit.transform.tag == "Door"){
      if(Inventory.ContainsKey(hit.collider.name)){
        hit.transform.hingeJoint.limits.max = 90;
      }
    }
    else if(hit.transform.tag == "ClosetDoor"){
      if (hit.transform.hingeJoint.motor.targetVelocity != -1000){
        hit.transform.hingeJoint.hingeJoint.motor.targetVelocity = -1000;
      }
      else{
        hit.transform.hingeJoint.hingeJoint.motor.targetVelocity = 1000;
      }
    }
  }
}

function OnGUI () {
  if(ShowTextBox){
    GUI.Box (Rect (Screen.width/2-50,Screen.height/2-25,100,50), TextBoxText);
  }
  if(CanUseFlashLight){
    GUI.Box (Rect (10,10,200,50), "BatteryPower @ "+Mathf.Floor(BatteryPower)+"%");
  }
  if (Input.GetButtonDown("Inventory")){
    IndexInventory();
  }
  if(Input.GetButton("Inventory")){
    GUI.Box (Rect (50,50,Screen.width/4,Screen.height-100), invtext);
  }
}

function IndexInventory(){
  invtext = String.Empty;
  for (var value : String in InventoryArr) {
    invtext+=value+"\n";
  }
}
