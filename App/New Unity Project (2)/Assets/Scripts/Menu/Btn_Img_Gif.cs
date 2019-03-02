using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Btn_Img_Gif : MonoBehaviour
{
    Image img;
    
    int frameCount = 0;
    Sprite img1;

    [SerializeField]int frameRate;
    [SerializeField]Sprite img2;
    // Start is called before the first frame update
    void Start()
    {
        img = GetComponent<Image>();
        img1 = img.sprite; 
    }

    // Update is called once per frame
    void Update()
    {
        ++frameCount;
        if (frameCount == frameRate)
            img.sprite = img2;
        else if(frameCount == frameRate * 2)
        {
            img.sprite = img1;
            frameCount = 0;
        }
    }
}
