<?php
  session_start();
  error_reporting(0);
  $grabToken = fopen("./weatherToken.txt", "r");
  $weatherToken= trim(fgets($grabToken));
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <style>
    *{
      box-sizing: border-box;
      font-family: sans-serif;
    }
    section{
      width: 75vw;
      margin: 0 auto;
    }
    h1, h2, h3{
      text-align: center;
    }
    placeholder{
      color: silver;
    }
    section>p{
      text-align: center;
      color: #aaa;
    }
    form, input[type=submit]{
      font-size: 1.2em;
    }
    input{
      font-size: 1.05em;
    }
    </style>
    <!-- https://afeld.github.io/emoji-css/ -->
    <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
    <title>Weather API</title>
  </head>
<body>
  <section>
  <form method="post">
    <span>Search for a place:</span> <input type="text" name="searchbar" value="<?php echo $_SESSION['searchloc'] ?? 'London, UK' ?>">
    <span>Select your timezone:</span> <select name="timezone">
   <option></option>
   <option value="Etc/GMT+12" <?php if ($_SESSION['TZ'] == "Etc/GMT+12") echo "selected"; ?>>(GMT-12:00) International Date Line West</option>
   <option value="Pacific/Midway" <?php if ($_SESSION['TZ'] == "Pacific/Midway" )echo "selected"; ?>>(GMT-11:00) Midway Island, Samoa</option>
   <option value="Pacific/Honolulu" <?php if ($_SESSION['TZ'] == "Pacific/Honolulu") echo "selected"; ?>>(GMT-10:00) Hawaii</option>
   <option value="US/Alaska" <?php if ($_SESSION['TZ'] == "US/Alaska") echo "selected"; ?>>(GMT-09:00) Alaska</option>
   <option value="America/Los_Angeles" <?php if ($_SESSION['TZ'] == "America/Los Angeles") echo "selected"; ?>>(GMT-08:00) Pacific Time (US & Canada)</option>
   <option value="America/Tijuana" <?php if ($_SESSION['TZ'] == "America/Tijuana") echo "selected"; ?>>(GMT-08:00) Tijuana, Baja California</option>
   <option value="US/Arizona" <?php if ($_SESSION['TZ'] == "US/Arizona" )echo "selected"; ?>>(GMT-07:00) Arizona</option>
   <option value="America/Chihuahua" <?php if ($_SESSION['TZ'] == "America/Chihuahua") echo "selected"; ?>>(GMT-07:00) Chihuahua, La Paz, Mazatlan</option>
   <option value="US/Mountain" <?php if ($_SESSION['TZ'] == "US/Mountain") echo "selected"; ?>>(GMT-07:00) Mountain Time (US & Canada)</option>
   <option value="America/Managua" <?php if ($_SESSION['TZ'] == "America/Managua") echo "selected"; ?>>(GMT-06:00) Central America</option>
   <option value="US/Central" <?php if ($_SESSION['TZ'] == "US/Central") echo "selected"; ?>>(GMT-06:00) Central Time (US & Canada)</option>
   <option value="America/Mexico_City" <?php if ($_SESSION['TZ'] == "America/Mexico_City") echo "selected"; ?>>(GMT-06:00) Guadalajara, Mexico City, Monterrey</option>
   <option value="Canada/Saskatchewan" <?php if ($_SESSION['TZ'] == "Canada/Saskatchewan") echo "selected"; ?>>(GMT-06:00) Saskatchewan</option>
   <option value="America/Bogota" <?php if ($_SESSION['TZ'] == "America/Bogota") echo "selected"; ?>>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option>
   <option value="US/Eastern" <?php if ($_SESSION['TZ'] == "US/Eastern") echo "selected"; ?>>(GMT-05:00) Eastern Time (US & Canada)</option>
   <option value="US/East-Indiana" <?php if ($_SESSION['TZ'] == "US/East-Indiana") echo "selected"; ?>>(GMT-05:00) Indiana (East)</option>
   <option value="Canada/Atlantic" <?php if ($_SESSION['TZ'] == "Canada/Atlantic") echo "selected"; ?>>(GMT-04:00) Atlantic Time (Canada)</option>
   <option value="America/Caracas" <?php if ($_SESSION['TZ'] == "America/Caracas") echo "selected"; ?>>(GMT-04:00) Caracas, La Paz</option>
   <option value="America/Manaus" <?php if ($_SESSION['TZ'] == "America/Manaus") echo "selected"; ?>>(GMT-04:00) Manaus</option>
   <option value="America/Santiago" <?php if ($_SESSION['TZ'] == "America/Santiago") echo "selected"; ?>>(GMT-04:00) Santiago</option>
   <option value="Canada/Newfoundland" <?php if ($_SESSION['TZ'] == "Canada/Newfoundland") echo "selected"; ?>>(GMT-03:30) Newfoundland</option>
   <option value="America/Sao_Paulo" <?php if ($_SESSION['TZ'] == "America/Sao_Paulo") echo "selected"; ?>>(GMT-03:00) Brasilia</option>
   <option value="America/Argentina/Buenos_Aires" <?php if ($_SESSION['TZ'] == "America/Argentina/Buenos_Aires") echo "selected"; ?>>(GMT-03:00) Buenos Aires, Georgetown</option>
   <option value="America/Godthab" <?php if ($_SESSION['TZ'] == "America/Godthab") echo "selected"; ?>>(GMT-03:00) Greenland</option>
   <option value="America/Montevideo" <?php if ($_SESSION['TZ'] == "America/Montevideo") echo "selected"; ?>>(GMT-03:00) Montevideo</option>
   <option value="America/Noronha" <?php if ($_SESSION['TZ'] == "America/Noronha") echo "selected"; ?>>(GMT-02:00) Mid-Atlantic</option>
   <option value="Atlantic/Cape_Verde" <?php if ($_SESSION['TZ'] == "Atlantic/Cape_Verde") echo "selected"; ?>>(GMT-01:00) Cape Verde Is.</option>
   <option value="Atlantic/Azores" <?php if ($_SESSION['TZ'] == "Atlantic/Azores") echo "selected"; ?>>(GMT-01:00) Azores</option>
   <option value="Africa/Casablanca" <?php if ($_SESSION['TZ'] == "Africa/Casablanca") echo "selected"; ?>>(GMT+00:00) Casablanca, Monrovia, Reykjavik</option>
   <option value="Etc/Greenwich" <?php if ($_SESSION['TZ'] == "Etc/Greenwich") echo "selected"; ?>>(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
   <option value="Europe/Amsterdam" <?php if ($_SESSION['TZ'] == "Europe/Amsterdam") echo "selected"; ?>>(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option>
   <option value="Europe/Belgrade" <?php if ($_SESSION['TZ'] == "Europe/Belgrade") echo "selected"; ?>>(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option>
   <option value="Europe/Brussels" <?php if ($_SESSION['TZ'] == "Europe/Brussels") echo "selected"; ?>>(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
   <option value="Europe/Sarajevo" <?php if ($_SESSION['TZ'] == "Europe/Sarajevo") echo "selected"; ?>>(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
   <option value="Africa/Lagos" <?php if ($_SESSION['TZ'] == "Africa/Lagos") echo "selected"; ?>>(GMT+01:00) West Central Africa</option>
   <option value="Asia/Amman" <?php if ($_SESSION['TZ'] == "Asia/Amman") echo "selected"; ?>>(GMT+02:00) Amman</option>
   <option value="Europe/Athens" <?php if ($_SESSION['TZ'] == "Europe/Athens") echo "selected"; ?>>(GMT+02:00) Athens, Bucharest, Istanbul</option>
   <option value="Asia/Beirut" <?php if ($_SESSION['TZ'] == "Asia/Beirut") echo "selected"; ?>>(GMT+02:00) Beirut</option>
   <option value="Africa/Cairo" <?php if ($_SESSION['TZ'] == "Africa/Cairo") echo "selected"; ?>>(GMT+02:00) Cairo</option>
   <option value="Africa/Harare" <?php if ($_SESSION['TZ'] == "Africa/Harare") echo "selected"; ?>>(GMT+02:00) Harare, Pretoria</option>
   <option value="Europe/Helsinki" <?php if ($_SESSION['TZ'] == "Europe/Helsinki") echo "selected"; ?>>(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
   <option value="Asia/Jerusalem" <?php if ($_SESSION['TZ'] == "Asia/Jerusalem") echo "selected"; ?>>(GMT+02:00) Jerusalem</option>
   <option value="Europe/Minsk" <?php if ($_SESSION['TZ'] == "Europe/Minsk") echo "selected"; ?>>(GMT+02:00) Minsk</option>
   <option value="Africa/Windhoek" <?php if ($_SESSION['TZ'] == "Africa/Windhoek") echo "selected"; ?>>(GMT+02:00) Windhoek</option>
   <option value="Asia/Kuwait" <?php if ($_SESSION['TZ'] == "Asia/Kuwait") echo "selected"; ?>>(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
   <option value="Europe/Moscow" <?php if ($_SESSION['TZ'] == "Europe/Moscow") echo "selected"; ?>>(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
   <option value="Africa/Nairobi" <?php if ($_SESSION['TZ'] == "Africa/Nairobi") echo "selected"; ?>>(GMT+03:00) Nairobi</option>
   <option value="Asia/Tbilisi" <?php if ($_SESSION['TZ'] == "Asia/Tbilisi") echo "selected"; ?>>(GMT+03:00) Tbilisi</option>
   <option value="Asia/Tehran" <?php if ($_SESSION['TZ'] == "Asia/Tehran") echo "selected"; ?>>(GMT+03:30) Tehran</option>
   <option value="Asia/Muscat" <?php if ($_SESSION['TZ'] == "Asia/Muscat") echo "selected"; ?>>(GMT+04:00) Abu Dhabi, Muscat</option>
   <option value="Asia/Baku" <?php if ($_SESSION['TZ'] == "Asia/Baku") echo "selected"; ?>>(GMT+04:00) Baku</option>
   <option value="Asia/Yerevan" <?php if ($_SESSION['TZ'] == "Asia/Yerevan") echo "selected"; ?>>(GMT+04:00) Yerevan</option>
   <option value="Asia/Kabul" <?php if ($_SESSION['TZ'] == "Asia/Kabul") echo "selected"; ?>>(GMT+04:30) Kabul</option>
   <option value="Asia/Yekaterinburg" <?php if ($_SESSION['TZ'] == "Asia/Yekaterinburg") echo "selected"; ?>>(GMT+05:00) Yekaterinburg</option>
   <option value="Asia/Karachi" <?php if ($_SESSION['TZ'] == "Asia/Karachi") echo "selected"; ?>>(GMT+05:00) Islamabad, Karachi, Tashkent</option>
   <option value="Asia/Calcutta" <?php if ($_SESSION['TZ'] == "Asia/Calcutta") echo "selected"; ?>>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
   <option value="Asia/Katmandu" <?php if ($_SESSION['TZ'] == "Asia/Katmandu") echo "selected"; ?>>(GMT+05:45) Kathmandu</option>
   <option value="Asia/Almaty" <?php if ($_SESSION['TZ'] == "Asia/Almaty") echo "selected"; ?>>(GMT+06:00) Almaty, Novosibirsk</option>
   <option value="Asia/Dhaka" <?php if ($_SESSION['TZ'] == "Asia/Dhaka") echo "selected"; ?>>(GMT+06:00) Astana, Dhaka</option>
   <option value="Asia/Rangoon" <?php if ($_SESSION['TZ'] == "Asia/Rangoon") echo "selected"; ?>>(GMT+06:30) Yangon (Rangoon)</option>
   <option value="Asia/Bangkok" <?php if ($_SESSION['TZ'] == "Asia/Bangkok") echo "selected"; ?>>(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
   <option value="Asia/Krasnoyarsk" <?php if ($_SESSION['TZ'] == "Asia/Krasnoyarsk") echo "selected"; ?>>(GMT+07:00) Krasnoyarsk</option>
   <option value="Asia/Hong_Kong" <?php if ($_SESSION['TZ'] == "Asia/Hong_Kong") echo "selected"; ?>>(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
   <option value="Asia/Kuala_Lumpur" <?php if ($_SESSION['TZ'] == "Asia/Kuala_Lumpur") echo "selected"; ?>>(GMT+08:00) Kuala Lumpur, Singapore</option>
   <option value="Asia/Irkutsk" <?php if ($_SESSION['TZ'] == "Asia/Irkutsk") echo "selected"; ?>>(GMT+08:00) Irkutsk, Ulaan Bataar</option>
   <option value="Australia/Perth" <?php if ($_SESSION['TZ'] == "Australia/Perth") echo "selected"; ?>>(GMT+08:00) Perth</option>
   <option value="Asia/Taipei" <?php if ($_SESSION['TZ'] == "Asia/Paipei") echo "selected"; ?>>(GMT+08:00) Taipei</option>
   <option value="Asia/Tokyo" <?php if ($_SESSION['TZ'] == "Asia/Tokyo") echo "selected"; ?>>(GMT+09:00) Osaka, Sapporo, Tokyo</option>
   <option value="Asia/Seoul" <?php if ($_SESSION['TZ'] == "Asia/Seoul") echo "selected"; ?>>(GMT+09:00) Seoul</option>
   <option value="Asia/Yakutsk" <?php if ($_SESSION['TZ'] == "Asia/Yakutsk") echo "selected"; ?>>(GMT+09:00) Yakutsk</option>
   <option value="Australia/Adelaide" <?php if ($_SESSION['TZ'] == "Australia/Adelaide") echo "selected"; ?>>(GMT+09:30) Adelaide</option>
   <option value="Australia/Darwin" <?php if ($_SESSION['TZ'] == "Australia/Darwin") echo "selected"; ?>>(GMT+09:30) Darwin</option>
   <option value="Australia/Brisbane" <?php if ($_SESSION['TZ'] == "Australia/Brisbane") echo "selected"; ?>>(GMT+10:00) Brisbane</option>
   <option value="Australia/Canberra" <?php if ($_SESSION['TZ'] == "Australia/Canberra") echo "selected"; ?>>(GMT+10:00) Canberra, Melbourne, Sydney</option>
   <option value="Australia/Hobart" <?php if ($_SESSION['TZ'] == "Australia/Hobart") echo "selected"; ?>>(GMT+10:00) Hobart</option>
   <option value="Pacific/Guam" <?php if ($_SESSION['TZ'] == "Pacific/Guam") echo "selected"; ?>>(GMT+10:00) Guam, Port Moresby</option>
   <option value="Asia/Vladivostok" <?php if ($_SESSION['TZ'] == "Asia/Vladivostok") echo "selected"; ?>>(GMT+10:00) Vladivostok</option>
   <option value="Asia/Magadan" <?php if ($_SESSION['TZ'] == "Asia/Magadan") echo "selected"; ?>>(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
   <option value="Pacific/Auckland" <?php if ($_SESSION['TZ'] == "Pacific/Auckland") echo "selected"; ?>>(GMT+12:00) Auckland, Wellington</option>
   <option value="Pacific/Fiji" <?php if ($_SESSION['TZ'] == "Pacific/Fiji") echo "selected"; ?>>(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
   <option value="Pacific/Tongatapu" <?php if ($_SESSION['TZ'] == "Pacific/Tongatapu") echo "selected"; ?>>(GMT+13:00) Nuku'alofa</option>
</select><br/>
    <input type="submit" value="Search!" name="search">
  </form>
</section>
  <?php
  if ($_SERVER['REQUEST_METHOD']=='POST'){
    $chosenSpot= $_POST['searchbar'];
    $TZ = $_POST['timezone'];
    $chosenZip= $_POST['searchzip'];
    $_SESSION['searchloc'] = $chosenSpot;
    $_SESSION['TZ'] = $TZ;
      $weather= file_get_contents("https://api.openweathermap.org/data/2.5/weather?q=". $chosenSpot . "&units=metric&cnt=2&appid=" . $weatherToken);

      if ($weather == false){
        echo "That area couldn't be found. Try something else?";
      } else {
        $jsondata = json_decode($weather);

        $temp = $jsondata->main->temp;
        $pressure = $jsondata->main->pressure;
        $mintemp = $jsondata->main->temp_min;
        $maxtemp = $jsondata->main->temp_max;
        $wind = $jsondata->wind->speed;
        $humidity = $jsondata->main->humidity;
        $desc = $jsondata->weather[0]->description;
        $maind = $jsondata->weather[0]->main;
        $descicon = $jsondata->weather[0]->icon;
        $town= $jsondata->name;
        $country= $jsondata->sys->country;
        $sunrise= $jsondata->sys->sunrise;
        $sunset= $jsondata->sys->sunset;
        $id= $jsondata->weather[0]->id;
        $cloudCover= $jsondata->clouds->all;
        $lat= $jsondata->coord->lat;
        $lon= $jsondata->coord->lon;
        // var_dump($jsondata);

        $now = date($jsondata->dt);
        if($now > $jsondata->sys->sunrise and $now < $jsondata->sys->sunset){
      	$suffix = '-d';
        }else{
      	$suffix = '-n';
        }
        $weatherIcon='';
        date_default_timezone_set($TZ);
        $now=  date(time());

          if ($country == "US"){
            echo "<section><h1>". $town .", ". $country ." <i class=\"em em-us\" aria-role=\"presentation\" aria-label=\"US Flag\"></i></h1>";
            } else if ($country == "GB"){
              echo "<section><h1>". $town .", ". $country ." <i class=\"em em-gb\" aria-role=\"presentation\" aria-label=\"GB Flag\"></i></h1>";
          } else {
            echo "<section><h1>". $town .", ". $country . " " . "<i class=\"em em-flag-". strtolower($country) ."\" aria-role=\"presentation\" aria-label=\"". $country ." Flag\"></i></h1>";
          }
          // echo "<h2>Low: " . $mintemp . "°C High: " . $maxtemp . "°C</h2>";
          echo "<h3><img src=\"http://openweathermap.org/img/wn/". $descicon . ".png\">" . ucfirst($desc) . " <img src=\"http://openweathermap.org/img/wn/" . $descicon . ".png\"></h3>";

          $localsunrise = date_default_timezone_set($TZ) ?? date_default_timezone_set('Etc/Greenwich');

          echo "<p>The sun will rise at " . date("H:i", $sunrise) . ". The sun will set at " . date("H:i", $sunset) . " (Dates are in ". $_SESSION['TZ'] . " time).</p>";
          echo "<p>Humidity is at " . $humidity . "%.</p>";
          if ($cloudCover < 10){
            echo "<p>Clear skies. High around " . $maxtemp . "°C. Low around " . $mintemp . "°C.</p>";
          } else if ($cloudCover < 50){
            echo "<p>Partially cloudy skies. High around " . $maxtemp . "°C. Low around " . $mintemp . "°C.</p>";
          } else if ($cloudCover > 50){
            echo "<p>Cloudy skies. High around " . $maxtemp . "°C. Low around " . $mintemp . "°C.</p>";
          }


  }

}

     ?>

</section>
  </body>
</html>
