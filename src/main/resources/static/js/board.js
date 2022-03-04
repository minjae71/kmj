function applySelect(no) {
    switch(no)
    {
        case 1:
            var form = document.align_select_form;
            setPageURI(form);
            break;
        case 2:
            var form = document.search_select_form;
            if(window.event.keyCode == 13) {
                setPageURI(form);
            }
            break;
        case 3:
            var form = document.excel_download_form;
            setPageURI(form);
            break;
    }
}

function setPageURI(form) {
        var sort = form.standard.value + "," + form.ascDesc.value;
        form.sort.value = encodeURI(sort);
        form.sort.value = decodeURI(form.sort.value);

        form.standard.disabled = true;
        form.ascDesc.disabled = true;

        form.submit();
}

function openUploadPopup() {
    let popUrl = "/board/excel/upload";
    let popOption = "width = 650px, height = 550px, top = 300px, left=300px, scrollbars=yes";

    window.open(popUrl, "_blank", popOption);
}