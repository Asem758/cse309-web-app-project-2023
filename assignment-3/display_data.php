<?php

$conn = new mysqli("localhost", "root", "", "contact_us_db");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM contacts_db"; 
$result = $conn->query($sql);

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Display Data</title>
</head>

<body>
  <h2>Customer Submissions</h2>
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Message</th>
    </tr>
    <?php
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
      echo "<tr>
                            <td>".$row["id"]."</td>
                            <td>".$row["first_name"]."</td>
                            <td>".$row["last_name"]."</td>
                            <td>".$row["email"]."</td>
                            <td>".$row["phone"]."</td>
                            <td>".$row["message"]."</td>
                        </tr>";
                }
            } else {
                echo "0 results";
            }
    ?>
  </table>
</body>

</html>

<?php
// Close the connection
$conn->close();
?>