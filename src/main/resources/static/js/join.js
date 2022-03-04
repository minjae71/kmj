/*************************  join  *************************/
function idCheck() {
	var accountId = $('#accountId').val();
	var regExpId = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;

	 var token = $("meta[name='_csrf']").attr("content");
     var header = $("meta[name='_csrf_header']").attr("content");

	if (accountId == "") {
		$('#accountId').css('background-color', '#FFCECE');
		$('#idMessage').css('color', 'red');
		$('#idMessage').html('아이디를 입력하여 주시기 바랍니다.');
	} else if (!regExpId.test(accountId)) {
		$('#accountId').css('background-color', '#FFCECE');
		$('#idMessage').css('color', 'red');
		$('#idMessage').html('6~10자의 영문, 숫자로만 입력해주세요.');
	} else {
		$.ajax({
			type: "POST",
			url: "join/exists",
			data: { accountId: accountId },
			beforeSend : function(xhr) {
			    xhr.setRequestHeader(header, token);
			},
			success: function (data) {
				if (!data) {
					$('#accountId').css('background-color', '#B0F6AC');
					$('#idMessage').css('color', 'green');
					$("#idMessage").text('멋진 아이디네요!');
					$('#idcheck').val('1');
				} else {
					$('#accountId').css('background-color', '#FFCECE');
					$('#idMessage').css('color', 'red');
					$("#idMessage").text("이미 사용중인 아이디입니다.");
					$('#idcheck').val('0');
				}
			},
			error: function (data, textStatus) {
				console.log('error');
			}
		})
	}
}

function valPwd() {
	var pwd1 = $('#pwd1').val();
	var pwd2 = $('#pwd2').val();
	var regExpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/;

	if (pwd2 != "") {
		$('#pwd2').css('background-color', '#FFCECE');
		$('#pwdCheckMessage').css('color', 'red');
		$('#pwdCheckMessage').html('비밀번호 확인이 일치하지 않습니다.');
	}

	if (pwd1 == "") {
		$('#pwd1').css('background-color', '#FFCECE');
		$('#pwdMessage').css('color', 'red');
		$('#pwdMessage').html('비밀번호를 입력하여 주시기 바랍니다.');
	}
	else if (!regExpPwd.test(pwd1)) {
		$('#pwd1').css('background-color', '#FFCECE');
		$('#pwdMessage').css('color', 'red');
		$('#pwdMessage').html('6~10자의 영문, 숫자, 특수문자를 모두 포함해 주시기 바랍니다.');
	} else {
		$('#pwd1').css('background-color', '#B0F6AC');
		$('#pwdMessage').css('color', 'green');
		$('#pwdMessage').html('사용 가능한 비밀번호입니다.');
	}
}

function checkPwd() {
	var regExpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/;
	var pwd1 = $('#pwd1').val();
	var pwd2 = $('#pwd2').val();

	if(pwd1!=pwd2) {
		$('#pwd2').css('background-color', '#FFC6C6');
		$('#pwdCheckMessage').css('color', 'red');
		$('#pwdCheckMessage').html('비밀번호 확인이 일치하지 않습니다.');
	} else if(!regExpPwd.test(pwd2)) {
		$('#pwd2').css('background-color', '#FFC6C6');
		$('#pwdCheckMessage').css('color', 'red');
		$('#pwdCheckMessage').html('비밀번호 형식이 올바르지 않습니다.');
	} else {
		$('#pwd2').css('background-color', '#CCE1AF');
		$('#pwdCheckMessage').css('color', 'green');
		$('#pwdCheckMessage').html('');
	}
}

function checkValidationJoin() {
	var form = document.joinForm;

	var regExpId = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/;
	var regExpName = /^[가-힣]{2,4}$/;
	var regExpPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/;
	var regExpHpNum = /^[0-9]*$/;
	var memberID = form.accountId.value;
	var memberPWD = form.password.value;
	var name = form.name.value;
	var year = form.birthYear.value;
	var month = form.birthMonth.value;
	var day = form.birthDay.value;
	var mailId = form.mailId.value;
	var mailDomain = form.mailDomain.value;
	var postcode = form.postcode.value;
	var detailAddress = form.detailAddress.value;
	var tel1 = form.phone1.value;
	var tel2 = form.phone2.value;
	var tel3 = form.phone3.value;


	if(memberID == "") {
		alert("아이디를 입력하여 주시기 바랍니다.");
		form.memberID.focus();
		return false;
	} else if(!regExpId.test(memberID)) {
		alert("아이디 형식이 올바르지 않습니다.\n6~10자의 영문, 숫자를 모두 포함해야 합니다.");
		form.memberID.focus();
		return false;
	} else if(form.idcheck.value=="0") {
		alert("이미 사용중인 아이디입니다.");
		return false;
	} else if(memberPWD == "") {
		alert("비밀번호를 입력하여 주시기 바랍니다.");
		form.memberPWD.focus();
		return false;
	} else if(!regExpPwd.test(memberPWD)) {
		alert("비밀번호 형식이 올바르지 않습니다.\n6~10자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
		form.memberPWD.focus();
		return false;
	} else if(memberPWD.search(/\s/)!=-1) {
		alert("비밀번호 형식이 올바르지 않습니다.\n6~10자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
		form.memberPWD.focus();
		return false;
	} else if(memberPWD.length < 6 || memberPWD.length > 10) {
		alert("비밀번호 형식이 올바르지 않습니다.\n6~10자의 영문, 숫자, 특수문자를 모두 포함해야 합니다.");
		form.memberPWD.focus();
		return false;
	} else if(memberPWD != form.passwordCheck.value) {
		alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		form.passwordCheck.focus();
		return false;
	} else if(name == "") {
		alert("이름을 입력하여 주시기 바랍니다.");
		form.name.focus();
		return false;
	} else if(!regExpName.test(name)) {
		alert("이름 형식이 올바르지 않습니다.\n2~4자의 한글만 가능합니다.");
		form.name.focus();
		return false;
	}  else if(year == "") {
		alert("태어난 년도를 선택해 주시기 바랍니다.");
		form.year.focus();
		return false;
	} else if(month == "") {
		alert("태어난 월을 선택해 주시기 바랍니다.");
		form.month.focus();
		return false;
	} else if(day == "") {
		alert("태어난 일을 선택해 주시기 바랍니다.");
		form.day.focus();
		return false;
	} else if(mailId == "") {
		alert("이메일을 입력하여 주시기 바랍니다.");
		form.mailId.focus();
		return false;
	} else if(mailDomain == "") {
		alert("이메일을 입력하여 주시기 바랍니다.");
		form.mailDomain.focus();
		return false;
	} else if(mailDomain.indexOf(".")==-1) {
		alert("이메일 형식이 올바르지 않습니다.");
		form.mailDomain.focus();
		return false;
	} else if(postcode == "") {
		alert("주소를 입력해 주시기 바랍니다.");
		form.postcode.focus();
		return false;
	} else if(detailAddress == "") {
		alert("상세주소를 입력해 주시기 바랍니다.");
		form.detailAddress.focus();
		return false;
	} else if(tel2 == "") {
		alert("연락처를 입력하여 주시기 바랍니다.");
		form.tel2.focus();
		return false;
	} else if(tel2.length < 3) {
		alert("연락처 형식이 올바르지 않습니다.");
		form.tel2.focus();
		return false;
	} else if(!regExpHpNum.test(tel2)) {
		alert("연락처는 숫자만 입력해 주시기 바랍니다.");
		form.tel2.focus();
		return false;
	} else if(tel3 == "") {
		alert("연락처를 입력하여 주시기 바랍니다.");
		form.tel3.focus();
		return false;
	} else if(tel3.length < 4) {
		alert("연락처 형식이 올바르지 않습니다");
		form.tel3.focus();
		return false;
	} else if(!regExpHpNum.test(tel3)) {
		alert("연락처는 숫자만 입력해 주시기 바랍니다.");
		form.tel3.focus();
		return false;
	} else if(!form.ck1.checked) {
		alert("릴리 이용 약관에 동의하지 않으셨습니다.");
		return false;
	} else if(!form.ck2.checked) {
		alert("개인정보 수집 및 이용 약관에 동의하지 않으셨습니다.");
		return false;
	} else if(!form.ck3.checked) {
		alert("개인정보 제 3자 제공 약관에 동의하지 않으셨습니다.");
		return false;
	} else {
	    var birth = String(year) + String(month) + String(day);
        var email = mailId + "@" + mailDomain;
        var phone = String(tel1) + String(tel2) + String(tel3);

        document.getElementById('birth').value = birth;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;

        form.submit();
	}
}


$(document).ready(function(){
    $("#every_agree").change(function(){
        if($("#every_agree").is(":checked")){
            $("#ck1").prop("checked", true);
            /*$("#ck1txt").css("color", "black");*/
            $("#ck2").prop("checked", true);
            /*$("#ck2txt").css("color", "black");*/
            $("#ck3").prop("checked", true);
            /*$("#ck3txt").css("color", "black");*/
        }else{
            $("#ck1").prop("checked", false);
            $("#ck2").prop("checked", false);
            $("#ck3").prop("checked", false);
        }
    });
    /*$("#c1").change(function(){
        if($("#c1").is(":checked")){
            $("#c1txt").css("color", "black");
        }
    });
    $("#c2").change(function(){
        if($("#c2").is(":checked")){
            $("#c2txt").css("color", "black");
        }
    });*/
    $("#ad_every_agree").change(function(){
        if($("#ad_every_agree").is(":checked")){
            $("#ad_ck1").prop("checked", true);
            /*$("#ck1txt").css("color", "black");*/
            $("#ad_ck2").prop("checked", true);
            /*$("#ck2txt").css("color", "black");*/
            $("#ad_ck3").prop("checked", true);
            /*$("#ck3txt").css("color", "black");*/
        }else{
            $("#ad_ck1").prop("checked", false);
            $("#ad_ck2").prop("checked", false);
            $("#ad_ck3").prop("checked", false);
        }
    });
});
function agree_check(form) {
	if(!$("#ck1").is(":checked")) {
		alert('릴리 이용약관 동의를 하지 않으셨습니다.');
		$("#ck1txt").css("color", "#FF665A"); /* red */
		$("#ck2txt").css("color", "#646464"); /* 원래색 */
		return false;
	} else if(!$("#ck2").is(":checked")) {
		alert('개인정보 수집 및 이용에 대한 안내를 선택하지 않으았습니다.');
		$("#c1txt").css("color", "#646464");
		$("#c2txt").css("color", "#FF665A");
		return false;
	}
	form.submit();
}
function agree1_popup() {
    //window.open("팝업될 문서 경로", "팝업될 문서 이름", "옵션")
    window.open("./user/agree.html", "약관동의 내용보기", "width = 770, height = 700, left = 200, top = 100")
}

function agree_popup() {
    //window.open("팝업될 문서 경로", "팝업될 문서 이름", "옵션")
    window.open("./user/agree_pay.html", "청약철회방침 내용보기", "width = 770, height = 600, left = 200, top = 100")
}

function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("extraAddress").value = extraAddr;

            } else {
                document.getElementById("extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("detailAddress").focus();
        }
    }).open();
}

function email_change() {
	var form = document.joinForm;
	if(form.email_select.options[form.email_select.selectedIndex].value == '') {
		form.email2.disabled = false;
		form.email2.value = "";
		form.email2.focus();
	} else {
		form.email2.disabled = true;
		form.email2.value = form.email_select.options[form.email_select.selectedIndex].value;
	}
}