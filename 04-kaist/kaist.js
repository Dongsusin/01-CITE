//원페이지 스크롤
const wrap = document.getElementsByClassName("wrap")[0];
const container = document.getElementsByClassName("container");
let page = 0;
const lastPage = container.length - 2;
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
//텍스트 애니메이션
const articles = document.querySelectorAll(".content");
const articleObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
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
