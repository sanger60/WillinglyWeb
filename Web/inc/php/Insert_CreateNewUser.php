<?php
header('Content-Type: application/json');

$DontUseChecker = true;

include_once("Config.php");

$Name = $_POST["Name"];
$Surname = $_POST["Surname"];
$UserName = $_POST["UserName"];
$Email = $_POST["Email"];
$Password = $_POST["Password"];

$Code = generateRandomString().generateRandomString().generateRandomString().generateRandomString();

$CheckHaveUserEmail = $Conn_pgsql->query("SELECT \"Id\" FROM public.\"Users\" Where \"Email\"='$Email'")->fetchAll(PDO::FETCH_ASSOC);
if (count($CheckHaveUserEmail) > 0)
{
	Print(json_encode(["Status"=>false,"Message"=>"Bu Email Adresiyle Eslesen Kullanici Bulunmaktadir"]));
    die();
}

$data08 = $Conn_pgsql->prepare("INSERT INTO public.\"Users\" (\"Name\", \"Surname\",\"Username\",\"Email\",\"Password\") VALUES ('$Name', '$Surname','$UserName','$Email','$Password')");
$data08->execute();

$UserId = $Conn_pgsql->query("SELECT * FROM public.\"Users\" Where \"Email\"='$Email' LIMIT 1")->fetchAll(PDO::FETCH_ASSOC)[0]["Id"];

$data09 = $Conn_pgsql->prepare("INSERT INTO public.\"UserActivationCode\" (\"UserId\", \"Type\",\"Code\") VALUES ('$UserId', '0','$Code')");
$data09->execute();

include_once("Mail/Core.php");

$file = file_get_contents('Mail/Template/MailActivationMail.html');

$bodytag = str_replace("{{LINK}}", "https://willingly.tk/inc/php/Update_UserActivation.php?Code=".$Code, $file);

$MailActivationCore = new Core($Email,"Willingly Hesabinizi Dogrulayiniz",$bodytag);

print(json_encode(array(
                "Status" => True,
                "Message" => "Kullanici Olusturuldu"
                )));

function generateRandomString($length = 3) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}