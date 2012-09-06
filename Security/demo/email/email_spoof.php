<?php


if(isset($_GET['content'])){
    $content	= $_GET['content'];
    $to		= $_GET['to_addr'];
    $from	= $_GET['from_addr'];
    $replyto	= $_GET['reply_to'];
    $subject	= $_GET['subject'];

    // Construct the header string
    $headers = 'From: ' . $from  . "\r\n" .
	       'Reply-To: ' . $replyto . "\r\n" .
	       'X-Mailer: PHP/' . phpversion();

    //// Wrap the content to 80 chars.
    $content = wordwrap($content, 80);

    //// Send
    mail($to, $subject, $content, $headers); 


}

?>
<html>
    <head><title>Email Spoofer</title>
	<style type="text/css">
	    div#message{
		border; solid 1px red;
		padding: 1em;
	    }
	</style>
    
    </head>
    <body>
	<h1>Email Spoofer</h1>
	<h2>Send malicious spam, it's fun!</h2>
	<hr/>


	<p style="color: red;">NB: Keep messages short.  This uses GET because I am lazy.<br/>Also, there is no status message, assume it worked.</p>

	<form action="" method="GET">
	    To: <input type="text" name="to_addr"/><br/><hr/>
	    From: <input type="text" name="from_addr"/><br/>
	    Reply-to: <input type="text" name="reply_to"/><br/>
	    Subject: <input type="text" name="subject" /><br/>
	    <textarea style="width: 100%; height: 350px;" name="content"></textarea><br/>
	    <input type="submit">
	</form>

    </body>
</html>
