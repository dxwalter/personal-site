// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function() {

    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu

    let nav = document.getElementById('navigation');
    let navStatus = nav.getAttribute('data-toggle');

    if (navStatus == 0) {
        
        // nav is not open
        // add is-active and showEffect
        // updata data-attr

        nav.classList.add("showEffect");
        nav.classList.add("is-active");
        nav.setAttribute('data-toggle', 1);


    } else {
        // nav is open 
        // toggle out showEffect
        // toggle in closeEffect
        // remove is-active after 3milisecs
        nav.classList.remove("showEffect");
        nav.classList.add("closeEffect");

        setTimeout(() => {
            nav.classList.remove("is-active");
            nav.classList.remove("closeEffect");
        }, 1000);
        nav.setAttribute('data-toggle', 0);
    }

});


/**
 * This is for tabs
 * 
 */
// store tabs letiable
let myTabs = document.querySelectorAll("#my-tab > #tab-menu");
function myTabClicks(tabClickEvent) {
		for (let i = 0; i < myTabs.length; i++) {
			myTabs[i].classList.remove("active");
		}
		// the very link that was clicked
        let clickedTab = tabClickEvent.currentTarget;

        // Add active class to the clicked tab
		clickedTab.classList.add("active");

        // stop the page from reloading
        tabClickEvent.preventDefault();
        let anchorReference = tabClickEvent.target;
        let activePaneId = anchorReference.getAttribute("data-tab");
        
        let myContentPanes = document.querySelectorAll("#tabContent .js-empty-tab-class");

        
		for (i = 0; i < myContentPanes.length; i++) {
			myContentPanes[i].classList.remove("active");
			myContentPanes[i].classList.remove("showEffect");
        }
        

        let tabAttribute = "#tabContent #"+activePaneId;
		let activePane = document.querySelector(tabAttribute);
		activePane.classList.add("active");
        activePane.classList.add("showEffect");
}
for (i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks)
}


let scrollHome = document.getElementById('scrollHome');
scrollHome.addEventListener('click', function() {
    window.scroll({ top: 0, behavior: 'smooth' });
});

let scrollServices = document.getElementById('scrollServices');
scrollServices.addEventListener('click', function() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

let scrollServicesTwo = document.getElementById('scrollServicesTwo');
scrollServicesTwo.addEventListener('click', function() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

let letsTalk = document.getElementById('letsTalk');
letsTalk.addEventListener('click', function() {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
});

let scrollAbout = document.getElementById('scrollAbout');
scrollAbout.addEventListener('click', function() {
    document.getElementById('about-me').scrollIntoView({ behavior: 'smooth' });
});

let scrollPortfolio = document.getElementById('scrollPortfolio');
scrollPortfolio.addEventListener('click', function() {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
});


let moreModal = document.getElementById('moreModal');
moreModal.addEventListener('click', function () {
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('moreBigModal').classList.add('slide-in');
    document.getElementById('moreBigModal').style.display = 'block';
    document.getElementById('bodyTag').style.overflowY = "hidden";
});

let closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', function () {

    document.getElementById('moreBigModal').classList.remove('slide-in');
    document.getElementById('moreBigModal').classList.add('slide-out');
    document.getElementById('modal-overlay').style.display = 'none';
    
    setTimeout(() => {
        document.getElementById('moreBigModal').style.display = 'none';
        document.getElementById('moreBigModal').classList.remove('slide-out');
        document.getElementById('bodyTag').style.overflowY = "scroll";
    }, 700);

})

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("service-type testimony-card");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove('showEffect')
    }
    slides[slideIndex-1].classList.add('showEffect')
    slides[slideIndex-1].style.display = "block";
}

let sendMessage = document.getElementById('sendMessage');
sendMessage.addEventListener('click', function () {
    let emailAddress = document.getElementById('emailAddress').value;
    let messageTitle = document.getElementById('messageTitle').value;
    let inputArea = document.getElementById('inputArea').value;

    if (emailAddress.length < 5) {
        showNotification('error', "Enter a valid email address");
        return;
    } 
    if (inputArea.length < 10) {
        showNotification('error', "Type your message");
    }

    sendMessage.innerHTML = 'Sending...';
    sendMessage.disabled = true;
    
    let send = {
        email: emailAddress,
        subject: messageTitle,
        body: inputArea
    };
    $.ajax
    ({
      type: "POST",
      url: "email.php",
      data: send,
      cache: false,
      success: function (response) {
        if (response == 'false') {
            showNotification('error', "An error occured sending your email.");
        } else {
            showNotification('success', "Your email was sent successfully.");
        }
      }

    });

    sendMessage.innerHTML = 'Send Message';
    sendMessage.disabled = false;

});


let showNotification = (type, message) => {

    let color;
    if (type == 'error') {
        color = 'alert-info';
    } else {
        color = 'alert-success';
    }

    let alertContainer = document.getElementById('errorAlert');
    alertContainer.innerHTML = message
    alertContainer.className = `alert show ${color}`;

    setTimeout(function(){ alertContainer.className = alertContainer.className.replace("show", ""); }, 3000);
}

let toggleNotification = document.getElementById('errorAlert');
toggleNotification.addEventListener('click', function () {
    toggleNotification.className = 'hide';
})
