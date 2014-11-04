#pragma strict

// JavaScript
private var selectedToolbar : int = 0;
private var toolbarStrings = ["One", "Two"];

function OnGUI () {
    // Determine which button is active, whether it was clicked this frame or not
    selectedToolbar = GUI.Toolbar (Rect (50, 10, Screen.width - 100, 30), selectedToolbar, toolbarStrings);

    // If the user clicked a new Toolbar button this frame, we'll process their input
    if (GUI.changed)
    {
        print ("The toolbar was clicked");

        if (selectedToolbar == 0)
        {
            print ("First button was clicked");
        }
        else
        {
            print ("Second button was clicked");
        }
    }
}
