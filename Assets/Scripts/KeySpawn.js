#pragma strict

public var prefab : GameObject;
//public var pos_Key : Vector3[];

function Start () {
  var pos_Key = new Array ();
  pos_Key.Push (Vector3(10, 1, 10));
  pos_Key.Push (Vector3(10, 1, -10));
  pos_Key.Push (Vector3(-10, 8, 10));
  pos_Key.Push (Vector3(-10, 8, -10));

  SpawnKey(pos_Key[Random.Range(0,pos_Key.length)]);
  SpawnKey(pos_Key[Random.Range(0,pos_Key.length)]);
  SpawnKey(pos_Key[Random.Range(0,pos_Key.length)]);
  SpawnKey(pos_Key[Random.Range(0,pos_Key.length)]);
  SpawnKey(pos_Key[Random.Range(0,pos_Key.length)]);
}

function SpawnKey(position : Vector3){
  //var position = Vector3(Random.Range(-20.0, 20.0), Random.Range(2.0, 10.0), Random.Range(-20.0, 20.0));
  Instantiate(prefab,position, Quaternion.identity);
}
