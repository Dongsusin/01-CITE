//원페이지 스크롤
const wrap = document.getElementsByClassName("wrap")[0];
const container = document.getElementsByClassName("container");
let page = 0;
const lastPage = container.length - 1;
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      page++;
    } else if (e.deltaY < 0) {
      page--;
    }
    if (page < 0) {
      page = 0;
    } else if (page > lastPage) {
      page = lastPage;
    }
    console.log(e.deltaY);
    wrap.style.top = page * -100 + "vh";
  },
  { passive: false }
);
//롤링 텍스트 전환
let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
rotateText();
setInterval(rotateText, 4000);
//롤링 텍스트 전환2
let words2 = document.querySelectorAll(".word2");
words2.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});
let currentWordIndex2 = 0;
let maxWordIndex2 = words2.length - 1;
words2[currentWordIndex2].style.opacity = "1";
let rotateText2 = () => {
  let currentWord2 = words2[currentWordIndex2];
  let nextWord2 =
    currentWordIndex2 === maxWordIndex2
      ? words2[0]
      : words2[currentWordIndex2 + 1];
  Array.from(currentWord2.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  nextWord2.style.opacity = "1";
  Array.from(nextWord2.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex2 =
    currentWordIndex2 === maxWordIndex2 ? 0 : currentWordIndex2 + 1;
};
rotateText2();
setInterval(rotateText2, 4000);
//PROPLE 텍스트 전환
//텍스트 애니메이션
const articles = document.querySelectorAll(".content");
const articleObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(function () {
          $(".blurtext span.past").removeClass("past");
          $(".blurtext span.active").addClass("past").removeClass("active");
          $(".blurtext span.past + span").addClass("active");
          if ($(".blurtext span.active").length == 0) {
            $(".blurtext span:nth-child(1)").addClass("active");
          }
        }, 0);
        setInterval(function () {
          $(".blurtext span.past").removeClass("past");
          $(".blurtext span.active").addClass("past").removeClass("active");
          $(".blurtext span.past + span").addClass("active");
          if ($(".blurtext span.active").length == 0) {
            $(".blurtext span:nth-child(1)").addClass("active");
          }
        }, 2490);
      }
    });
  },
  { threshold: 0.3 }
);
articles.forEach((article) => {
  articleObserver.observe(article);
});
//포토폴리오 팝업
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(";").shift() : null;
}
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
window.deletePopupCookie = () => deleteCookie("hidePopup");
document.addEventListener("DOMContentLoaded", function () {
  if (getCookie("hidePopup") !== "true") {
    const overlay = document.createElement("div");
    overlay.style = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background-color: rgba(0, 0, 0, 0.5); z-index: 999;
        `;
    const popup = document.createElement("div");
    popup.style = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            padding: 20px; background-color: white; border: 1px solid #333;
            border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center; z-index: 1000;
        `;
    popup.innerHTML = `
            <p>이 사이트는 상업적인 용도가 아니며,<br> 포트폴리오 용도로 제작되었습니다.</p>
            <button style="
                margin-top: 12px; padding: 4px 12px; border-radius: 4px; border: none;
                background-color: #333; color: white; cursor: pointer;
            ">닫기</button>
            <br/>
            <label style="margin-top: 8px; display: block; cursor: pointer;">
                <input type="checkbox" style="margin-right: 5px;" id="noShowToday">
                오늘 다시 보지 않기
            </label>
        `;
    const closeButton = popup.querySelector("button");
    const noShowToday = popup.querySelector("#noShowToday");
    closeButton.addEventListener("click", () => {
      if (noShowToday.checked) {
        setCookie("hidePopup", "true", 1);
      }
      overlay.remove();
      popup.remove();
    });
    document.body.append(overlay, popup);
  }
});
//재부팅시 스크롤 위치 초기화
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 10);
};
