window.addEventListener("DOMContentLoaded", function () {
  "use strict";
  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  info.addEventListener("click", function (e) {
    let target = e.target;
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  //timer

  let deadline = "2022-01-24";

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((((t / 1000) * 60 * 60) % 24) + 19),
      days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      days = timer.querySelector(".days"),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      days.textContent = t.days;
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
      }

      switch (t.days) {
        case 0:
          days.textContent = "00";
          break;
        case 1:
          days.textContent = "01";
          break;
        case 2:
          days.textContent = "02";
          break;
        case 3:
          days.textContent = "03";
          break;
        case 4:
          days.textContent = "04";
          break;
        case 5:
          days.textContent = "05";
          break;
        case 6:
          days.textContent = "06";
          break;
        case 7:
          days.textContent = "07";
          break;
        case 8:
          days.textContent = "08";
          break;
        case 9:
          days.textContent = "09";
          break;
      }
      switch (t.hours) {
        case 0:
          hours.textContent = "00";
          break;
        case 1:
          hours.textContent = "01";
          break;
        case 2:
          hours.textContent = "02";
          break;
        case 3:
          hours.textContent = "03";
          break;
        case 4:
          hours.textContent = "04";
          break;
        case 5:
          hours.textContent = "05";
          break;
        case 6:
          hours.textContent = "06";
          break;
        case 7:
          hours.textContent = "07";
          break;
        case 8:
          hours.textContent = "08";
          break;
        case 9:
          hours.textContent = "09";
          break;
      }
      switch (t.minutes) {
        case 0:
          minutes.textContent = "00";
          break;
        case 1:
          minutes.textContent = "01";
          break;
        case 2:
          minutes.textContent = "02";
          break;
        case 3:
          minutes.textContent = "03";
          break;
        case 4:
          minutes.textContent = "04";
          break;
        case 5:
          minutes.textContent = "05";
          break;
        case 6:
          minutes.textContent = "06";
          break;
        case 7:
          minutes.textContent = "07";
          break;
        case 8:
          minutes.textContent = "08";
          break;
        case 9:
          minutes.textContent = "09";
          break;
      }
      switch (t.seconds) {
        case 0:
          seconds.textContent = "00";
          break;
        case 1:
          seconds.textContent = "01";
          break;
        case 2:
          seconds.textContent = "02";
          break;
        case 3:
          seconds.textContent = "03";
          break;
        case 4:
          seconds.textContent = "04";
          break;
        case 5:
          seconds.textContent = "05";
          break;
        case 6:
          seconds.textContent = "06";
          break;
        case 7:
          seconds.textContent = "07";
          break;
        case 8:
          seconds.textContent = "08";
          break;
        case 9:
          seconds.textContent = "09";
          break;
      }
    }
  }
  setClock("timer", deadline);

  // модальное окно
  let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close");

  more.addEventListener("click", function () {
    overlay.style.display = "block";
    this.classList.add("more-splash");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", function () {
    overlay.style.display = "none";
    more.classList.remove("more-splash");
    document.body.style.overflow = "";
  });

  // Form

  let message = {
    loading: "Загрузка...",
    success: "Спасибо, скоро мы с вами свяжемся!",
    fail: "Что-то пошло не так",
  };

  let form = document.querySelector(".main-form"),
    form2 = document.querySelector(".contact-you"),
    input = document.getElementsByTagName("input"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.appendChild(statusMessage);
    let formData = new FormData(form);

    function postData(data) {
      return new Promise(function(resolve, reject) {

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");

        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });

        let json = JSON.stringify(obj);
        request.send(json);

        request.onreadystatechange = function () {
          if (request.readyState < 4) {
            resolve();
          } else if (request.readyState === 4 && request.status == 200) {
            resolve();
          } else {
            reject();
          }
        };
        request.send(data);
      });
    }
    function clearInput() {
      for (let i = 0; i < input.length; i++) {
          input[i].value = "";
        }
    }
    postData(formData)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.fail)
        .then(clearInput);

  });

  form2.addEventListener("submit", function (e) {
    e.preventDefault();
    form2.appendChild(statusMessage);
    let form2Data = new FormData(form2);

    function postData (data) {
      return new Promise(function(resolve, request) {
        let request2 = new XMLHttpRequest();
        request2.open("POST", "server.php");
        request2.setRequestHeader("Content-type", "application/json; charset=utf-8");
    
        let obj2 = {};
        form2Data.forEach(function (value, key) {
          obj2[key] = value;
        });
        statusMessage.style.color = "white";
        statusMessage.style.marginTop = "30px";
        let json = JSON.stringify(obj2);
        request.send(json);
    
        request.onreadystatechange = function () {
          if (request2.readyState < 4) {
            resolve();
          } else if (request2.readyState === 4 && request2.status == 200) {
            resolve();
          } else {
            reject();
          }
        };
        request.send(data);
      });
    }
    function clearInput() {
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
    }
    postData(form2Data)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.fail)
        .then(clearInput);
  });


  // Slider

  let slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');

  showSlides(1);   
  function showSlides(n) {

    if(n > slides.length){
      slideIndex = 1;
    }

    if(n < 1){
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function() {
    plusSlides(-1);
  });
  next.addEventListener('click', function() {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', function(e) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
        currentSlide(i);
      }
    }
  });

  //Calc 

  let persons = document.querySelectorAll('.counter-block-input')[0],
      restDays = document.querySelectorAll('.counter-block-input')[1],
      place = document.getElementById('select'),
      totalValue = document.getElementById('total'),
      personsSum = 0,
      daysSum = 0,
      total = 0;
  

  totalValue.textContent = 0;

  persons.addEventListener('change', function() {
    personsSum = +this.value;
    total = (daysSum + personsSum)*4000;

    if (restDays.value == '') {
      totalValue.textContent = 0;
    } else {
      totalValue.textContent = total;
    }

    if (persons.value == '') {
      totalValue.textContent = 0;
    }
  });

  restDays.addEventListener('change', function() {
    daysSum = +this.value;
    total = (daysSum + personsSum)*4000;

    if (persons.value == '') {
      totalValue.textContent = 0;
    } else {
      totalValue.textContent = total;
    }
    if (restDays.value == '') {
      totalValue.textContent = 0;
    }
  });

  place.addEventListener('change', function() {
    if (restDays.value == '' || persons.value == '') {
      totalValue.textContent = 0;
    } else {
      let a = total;
      totalValue.textContent = a * this.options[this.selectedIndex].value;
    }
  });
  
});
