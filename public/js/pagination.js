var currentPage = 1;
var recordsPerPage = 30;

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage(page) {
    var btnNext = document.getElementById("btnNext");
    var btnPrev = document.getElementById("btnPrev");
    var adsListing = document.getElementById("adsListing");
    // var pageSpan = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    adsListing.innerHTML = "";

    for (var i = (page-1) * recordsPerPage; i < (page * recordsPerPage) && i < objJson.length; i++) {
        if (objJson[i].adName.length > 77) {
            objJson[i].adName = objJson[i].adName.slice(0, 75);
        }
        
        if (objJson[i].newFilePath) {
             adsListing.innerHTML += '<li><a href="' + objJson[i].url + '"><span class="adNameThumb">' + objJson[i].adName + '</span></a><img src="uploads/thumb_' + objJson[i].newFilePath + '" class="hiddenImage"/><span class="adPrice">' + objJson[i].price + '</span><span class="adDate">' + objJson[i].date + '</span></li>';
        } else {
            adsListing.innerHTML += '<li><a href="' + objJson[i].url + '"><span class="adName">' + objJson[i].adName + '</span></a><span class="adPrice">' + objJson[i].price + '</span><span class="adDate">' + objJson[i].date + '</span></li>';
        }
    }


    // pageSpan.innerHTML = page;

    if (page == 1) {
        btnPrev.style.visibility = "hidden";
    } else {
        btnPrev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(objJson.length / recordsPerPage);
}

window.onload = function() {
    changePage(1);
};