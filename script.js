const form = document.getElementById("form-box");
const qrCode = document.getElementById("qrcode");

const onClickSubmit = (e) => {
    e.preventDefault();
    clearPage();
    const url = document.getElementById("url").value;
    const sizes = document.getElementById("sizes").value;
    if(url === "") {
        alert("Kindly input link");
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            generateCode(url, sizes);
            setTimeout(() => {
                const downloadUrl = qrCode.querySelector("img").src;
                createDownload(downloadUrl);
            }, 50);
        }, 3000)
    } 
}

const generateCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size
    });
}

const clearPage = () => {
    qrCode.innerHTML = "";
    const downloadLink = document.getElementById("download-link");
    if(downloadLink) {
        downloadLink.remove();
    }
}

const createDownload = (downloadLink) => {
    const link = document.createElement("a");
    link.id = "download-link";
    link.classList = "bg-green-500 rounded w-1/3 text-white py-2 my-5 m-auto font-bold hover:bg-green-700";
    link.href= downloadLink;
    link.download = "qrcode";
    link.innerHTML = "Download Image";
    document.getElementById("generated").appendChild(link)
}

const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
}

const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
}

hideSpinner();

form.addEventListener("submit", onClickSubmit);