<?php
// Pre-HTML rendering
session_start();
$pa_or_uk = array('pa', 'uk');
$rand = array_rand($pa_or_uk, 1);
// Determines the picture but also the Answer.
$picChoice= $pa_or_uk[$rand];
$_SESSION['answer'] = $picChoice;
// echo "Answer: " . $_SESSION['answer'];
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css" type="text/css">
    <title></title>
  </head>
  <body>
  <form method="post" name="guess">
    <input type="text" value="<?php echo $_SESSION['answer']?>" name="answer" readonly style="display: none;">
    <input type="submit" name="guess" style="background-color:maroon" value="Pennsylvania"><input type="submit" style="background-color:navy" name="guess" value="England">
    <input type="submit" name="restart" style="background-color:green" value="Restart">
  </form>
    <?php
      if ($picChoice == 'pa'){
        // Pennsylvania
        $imgchoice= rand(1,14);
        echo "<section><img class=\"tiny\" src=\"./images/pa/". $imgchoice.".png\"></section>";
      } else {
        // England
        $imgchoice= rand(1,10);
        echo "<section><img class=\"tiny\" src=\"./images/uk/".$imgchoice.".png\"></section>";
      }

      if (isset($_POST['guess'])){
          if ($_POST['answer'] == 'uk' && $_POST['guess'] == 'England'){
            echo "<section>Yeah, that's England. <br/>";
            if (!isset($_SESSION['score'])){
              $_SESSION['score']= 1;
            } else {
              $_SESSION['score'] += 1;
            }
          } else if ($_POST['answer'] == 'pa' && $_POST['guess'] == 'Pennsylvania'){
            echo "<section>Yeah, that's Pennsylvania. <br/>";
            if (!isset($_SESSION['score'])){
              $_SESSION['score']= 1;
            } else {
              $_SESSION['score'] += 1;
            }
          } else {
              if ($_POST['answer']=='uk') echo "<section>Nope, that's England. <br/>";
              if ($_POST['answer']=='pa') echo "<section>Nope, that's Pennsylvania. <br/>";
          }

          echo "Score: ". $_SESSION['score'] ."</section>";
      }
      if (isset($_POST['restart'])){
        session_unset();
        session_destroy();
        header("pa-or-uk.php");
      }
     ?>
  </body>
</html>
