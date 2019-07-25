using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Btn_Cancel : MonoBehaviour
{
    public InputField inputText;
    public Image img;
    private ShowToastMsg toastMsg;
    // Start is called before the first frame update
    void Start()
    {
        toastMsg = FindObjectOfType<ShowToastMsg>();
    }

    public void ButtonClick()
    {
        try
        {
            inputText.text = "";
            img.sprite = null;
            img.color = new Color(255f, 255f, 255f, 0f);
            toastMsg.ShowMsg("QRCode與文字清空完成!");
        }
        catch(Exception ex)
        {
            toastMsg.ShowMsg(ex.Message);
        }
    }
}
