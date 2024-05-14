<?php 
echo file_get_contents("exchangeRates.json");
if(isset($_POST['newdata']))
{
    file_put_contents('exchangeRates.json',$_POST['newdata']);
}
?>