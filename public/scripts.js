const menuItems = document.querySelectorAll("header .links a");

const currentPage = location.pathname;
console.log(currentPage);
menuItems.forEach(function(item){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
})