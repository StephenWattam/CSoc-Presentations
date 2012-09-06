<?php

// the file to write/read from
$fileName="messages";

// write the new message to a file.


/*   This is disabled for now, since it's such a huge security risk.
   The purpose of the script was to illustrate the security flaws anyway.
  * /*/ 
   if(isset($_GET['message'])){
    $fout = fopen($fileName, 'a');  // append
    fwrite($fout, $_GET['message'] . "<hr>\n");
    fclose($fout);
}

/**/
?>

<h3>Messages!</h3>
<p>Post a message below.  It's all fun 'n' stuff, like.

<p>This is disabled, due to massive security problems, obviously.

<h4>New Message</h4>
<form action="" method="get">
    <input type="text" size="200" name="message" value="type message here" onclick="this.value='';" />
    <input type="submit">
</form>



<h4>Messages</h4>
<?php
// open, dump to stdout, close.
$fin = fopen($fileName, 'r');
echo( fread($fin, filesize($fileName)) );
fclose($fin);
?>



