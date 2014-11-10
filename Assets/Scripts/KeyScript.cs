using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class KeyScript : MonoBehaviour {

	public List<GameObject> keys;
	public List<Transform> keySpawnPosition;

	void Start()
	{
		foreach(GameObject k in keys)
		{
			int randomnr = Random.Range(0, keySpawnPosition.Count);
			Instantiate(k, keySpawnPosition[randomnr].position, keySpawnPosition[randomnr].rotation);
			keySpawnPosition.RemoveAt(randomnr);
		}
	}
}
