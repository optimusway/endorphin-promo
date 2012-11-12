<?
$email = $_POST['email'];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,"http://endorphin.us6.list-manage1.com/subscribe/post?u=004b8ed908f7a821c7ab01935&id=f7be5fef0c");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "MERGE0=".$email);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);

curl_close ($ch);

echo $server_output;