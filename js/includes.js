(function () {
  var bodyOverflowStyle = document.body.style.overflow, screenCaptureUrl;
  var toggle = "<div id='betaloop-widget-toggle' class='betaloop-widget-toggle'><div class='betaloop-widget-toggle-icon'></div></div>";
  var widget = "" +
      "<div class='betaloop-widget-wrapper' id='betaloop-widget'>" +
        "<div id='betaloop-widget-backing' class='betaloop-widget-backing'></div>" +
          "<div class='betaloop-widget-main-form-wrapper'>" +
            "<div class='betaloop-widget-main-form'>" +
                "<span class='betaloop-widget-main-form-close' id='betaloop-widget-main-form-close'>&times;</span>" +
                "<div class='betaloop-widget-main-form-content'>" +
                    "<div class='betaloop-widget-main-form-content-header'>" +
                        "<p><strong>You are logged in to Betaloop as:</strong></p>" +
                        "<p>ObiVanKenobi@jedi.com</p>" +
                    "</div>" +
                    "<div id='betaloop-widget-main-form-leave-mapped-comment-btn' class='betaloop-widget-main-form-leave-comment-btn betaloop-widget-btn betaloop-widget-blue-btn betaloop-widget-btn-block'>Leave a Mapped Comment</div>" +
                    "<p class='betaloop-widget-main-form-textarea-title'>General Screen Comments </p>" +
                    "<textarea class='betaloop-widget-main-form-textarea'></textarea>" +
                    "<div class='betaloop-widget-text-right betaloop-widget-main-form-send-feedback-btn-wrapper'> <div id='betaloop-widget-main-form-send-feedback-btn' class='betaloop-widget-main-form-send-feedback-btn betaloop-widget-btn betaloop-widget-green-btn'>Send Feedback</div> </div>" +
                "</div>" +
            "</div>" +
          "</div>" +
      "</div>";
  var spotId = 1;

  document.body.insertAdjacentHTML("beforeend", toggle);

  document.getElementById('betaloop-widget-toggle').addEventListener('click', showMainForm);

  function showMainForm() {
    this.classList.add('hidden');
    document.body.insertAdjacentHTML("beforeend", widget);
    document.getElementById('betaloop-widget-main-form-close').addEventListener('click', closeMainForm);
    document.getElementById('betaloop-widget-main-form-leave-mapped-comment-btn').addEventListener('click', letAddingMappedComment);
  }

  function letAddingMappedComment() {
    document.getElementById('betaloop-widget').classList.add('hidden');

    setTimeout(function() {
      chrome.runtime.sendMessage({createCapture: true});
      document.getElementById('betaloop-widget').classList.remove('hidden');
    }, 0);

    document.body.style.overflow = 'hidden';
    this.textContent = 'Exit Mapped Comment Mode';
    this.classList.remove('betaloop-widget-blue-btn');
    this.classList.add('betaloop-widget-light-grey-btn');
    this.removeEventListener('click', letAddingMappedComment);
    this.addEventListener('click', exitMappedCommentMode);
    document.getElementById('betaloop-widget-backing').addEventListener('click', addMappedComment);
  }

  function exitMappedCommentMode() {
    this.textContent = 'Leave a Mapped Comment';
    this.classList.remove('betaloop-widget-light-grey-btn');
    this.classList.add('betaloop-widget-blue-btn');
    document.getElementById('betaloop-widget-backing').removeEventListener('click', addMappedComment);
    this.removeEventListener('click', exitMappedCommentMode);
    this.addEventListener('click', letAddingMappedComment);
  }

  function closeMainForm() {
    document.getElementById('betaloop-widget-toggle').classList.remove('hidden');
    document.getElementsByClassName('betaloop-widget-wrapper')[0].classList.add('closing');
    document.getElementsByClassName('betaloop-widget-wrapper')[0].addEventListener("animationend", function() {
      document.body.removeChild(document.getElementById('betaloop-widget'));
    });
    document.body.style.overflow = bodyOverflowStyle;
    spotId = 1;
  }

  function addMappedComment(e) {
    var currentSpotId = "betaloop-widget-mapped-comment-spot-" + spotId;
    var currentSpot = "<span id=" + currentSpotId + " style='top:" + (e.y - 20) + "px;left:" + (e.x - 20) + "px;z-index:1000000" + spotId + "' class='betaloop-widget-mapped-comment-spot'><span class='betaloop-widget-mapped-comment-spot-content-wrapper'><span class='betaloop-widget-mapped-comment-spot-id'> " + spotId + "</span></span></span>";
    document.getElementById('betaloop-widget-backing').insertAdjacentHTML("afterBegin", currentSpot);
    spotId++;
  }
})();