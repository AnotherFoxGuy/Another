#pragma strict

/*
dist > 5 &&
*/

public var MoveTo : Transform;
private var textboxtext = "";
private var FoundPlace = false;

function Start () {
}

function Update () {
  transform.LookAt(MoveTo);
  var hit : RaycastHit;
  var dist = Vector3.Distance(MoveTo.position, transform.position);
  if (Physics.Raycast (transform.position,transform.TransformDirection(Vector3.forward), hit, dist)){
    if (hit.collider != null){
      renderer.enabled = false;
      Warp();
    }
  }
  else{
    Debug.DrawLine (transform.position, MoveTo.position);
    renderer.enabled = true;
  }
  if(!FoundPlace){
    Warp();
  }

}
/*
function OnGUI () {
  GUI.Box (Rect (10,100,150,50),textboxtext);
}
*/
function Warp(){
  FoundPlace = false;
  var RandomPosition = Vector3(Random.Range(MoveTo.position.x - 20.0, MoveTo.position.x + 20.0), MoveTo.position.y, Random.Range(MoveTo.position.x - 20.0, MoveTo.position.x + 20.0));
  var dist = Vector3.Distance(MoveTo.position, transform.position);
  var targetDir = Camera.main.transform.position - transform.position;
  var forward = Camera.main.transform.forward;
  var angle = Vector3.Angle(targetDir, forward);
  textboxtext = dist+" @ "+angle;
  if(dist < 5 || angle > 120 || !renderer.enabled){
    transform.position = RandomPosition;
  }
  else{
    FoundPlace = true;
  }
}
