using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Btn_Cancel : MonoBehaviour
{
    public InputField inputText;
    public Image img;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void ButtonClick()
    {
        inputText.text = "";
        img.sprite = null;
        img.color = new Color(255f, 255f, 255f, 0f);
    }
}
