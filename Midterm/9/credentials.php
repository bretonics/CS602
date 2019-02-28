<!-- 
You create a session in PHP by setting cookies in the browser.
session_start() starts or resumes a session.
The application creates a cookie, in PHP using setcookie(), and
sends it to the browser.

You set values in the form of: $_SESSION['key'] = 'value'
Remove a specific piece of data by: unset($_SESSION['key'])
Remove all session data: $_SESSION = array()
-->

<!-- HTML credentials form -->
<form action="./checks.php" id="credentials" method="post">
    Username: <input type="text" name="username"><br>
    Password: <input type="password" name="password"><br>
    <input type = "submit" value="Submit">
</form>

<?php
session_start();
?>