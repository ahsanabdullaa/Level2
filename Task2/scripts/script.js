// load counter on reaching its position
var a = 0;
$(window).scroll(function () {
  var oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter-value").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
      $({
        countNum: $this.text(),
      }).animate(
        {
          countNum: countTo,
        },

        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          },
        }
      );
    });
    a = 1;
  }
});

//nav bar animation over scroll
$(window).on("scroll", function () {
  if ($(window).scrollTop() >= 100) {
    $(".navbar").addClass("fixed");
  } else $(".navbar").removeClass("fixed");
});

//Smooth scrolling with links
$("a[href^=\\#]").on("click", function (event) {
  event.preventDefault();
  $("html,body").animate({ scrollTop: $(this.hash).offset().top }, 500);
});
