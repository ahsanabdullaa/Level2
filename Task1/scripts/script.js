$(document).ready(function () {
  $(".btn").on("click", buttonsHandler);
});

// handle the click event of the buttons
function buttonsHandler() {
  var result = $(".result").text();
  if ($(this).text() === "AC") {
    result = "";
    $(".result").text(result);
    return;
  }
  if ($(this).text() === "del") {
    result = result.slice(0, -1);
    $(".result").text(result);
    return;
  }
  if ($(this).text() === "=") {
    try {
      result = eval(result);
      $(".result").text(result);
    } catch (err) {
      result = "";
      $(".result").text(err.message.split(" ")[0]);
    }
    return;
  }
  var buttonValue = $(this).text();
  result = result.concat(buttonValue);
  console.log(result);
  $(".result").text(result);
}
