<?php
header('Content-Type: application/json');

$DontUseChecker = true;

include_once("Config.php");

$QueryStep1 = "";
$QueryStep2 = "";

CreateInsertQuery($_POST["Reciver"],true,"Reciver");
CreateInsertQuery($_POST["Text"],false,"Text");
CreateInsertQuery($_POST["ChatID"],false,"ChatID"); 

$data08 = $Conn_pgsql->prepare("INSERT INTO public.\"Messages\" ($QueryStep1,\"Sender\") VALUES ($QueryStep2,'$Global_UserID')");
$data08->execute();


print(json_encode(array(
                "Status" => True,
                "Message" => "Kullanici Olusturuldu"
                )));

function CreateInsertQuery($Text,$IsFirst = false,$Name){
    global $QueryStep1;
    global $QueryStep2;

    if (!is_null($Text) && isset($Text) && $Text != "")
    {
        if ($IsFirst != true)
        {
        	$QueryStep1 .= ",";
            $QueryStep2 .= ",";
        }
        
	    $QueryStep1 .= " \"$Name\"";
        $QueryStep2 .= " '$Text'";
    }
}