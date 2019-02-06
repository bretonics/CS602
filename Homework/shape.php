<script type="text/javascript">
function formulas(shape) {
    console.log(shape.value);
    if (shape.value) {
        document.getElementById(shape.value).style.display = "block";
    } else {
        document.getElementById(shape.value).style.display = "none";
    }
}
</script>

<p>Please choose the type of shape you want to find the area for:</p>
<form action = "<?php echo $PHP_SELF ?>" method = "post" onchange="formulas(shape)">
    <select id="shape" name="shape">
        <option value="">Select</option>
        <option value="Trapezoid">Trapezoid</option>
        <option value="Cone">Cone</option>
        <option value="Square">Square</option>
        <option value="Circle">Circle</option>
        <option value="Rectangle">Rectangle</option>
        <option value="Cylinder">Cylinder</option>
        <option value="Triangle">Triangle</option>
    </select>
    <br><br>
    <div id="Trapezoid" style="display:none;">
        Base 1 length: <input type="text" name="base1"><br>
        Base 2 length: <input type="text" name="base2"><br>
        Height: <input type="text" name="height"><br>
    </div>
    <div id="Cone" style="display:none;">
        Radius: <input type="text" name="radius"><br>
        Height: <input type="text" name="height"><br>
    </div>
    <div id="Square" style="display:none;">
        Side: <input type="text" name="side"><br>
    </div>
    <div id="Circle" style="display:none;">
        Radius: <input type="text" name="radius"><br>
    </div>
    <div id="Rectangle" style="display:none;">
        Height: <input type="text" name="height"><br>
        Length: <input type="text" name="length"><br>
    </div>
    <div id="Cylinder" style="display:none;">
        Radius: <input type="text" name="radius"><br>
        Height: <input type="text" name="height"><br>
    </div>
    <div id="Triangle" style="display:none;">
        Height: <input type="text" name="height"><br>
        Length: <input type="text" name="length"><br>
    </div>
    <br><br>
    <input type = "submit" value="Submit">
</form>

<hr>

<?php
var_dump($_POST);
$shape = $_POST["shape"];
$H = $_POST["height"];
$L = $_POST["length"];
$R = $_POST["radius"];
$B1 = $_POST["base1"];
$B2 = $_POST["base2"];
$S = $_POST["side"];

$area;

switch ($shape) {
    case 'Trapezoid':
        // code...
        break;
    case 'Cone':
        // code...
        break;
    case 'Square':
        // code...
        break;
    case 'Circle':
        $area = pi() * $R * $R;
        break;
    case 'Rectangle':
        $area = $H * $L;
        break;
    case 'Cylinder':
        // code...
        break;
    case 'Triangle':
        $area = ($H * $L) / 2;
        break;
}
echo "<br>The area for your $shape is: $area";
?>
