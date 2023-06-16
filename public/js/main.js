$(()=>{
	$('.login-submit').on('click', ()=>{
		let email=$('.email-login').val();
		let password=$('.password-login').val();
		$(".feed").text(`Your email is ${email} and your password is ${password} `);

	
	})


	$('.register-now').on('click', ()=>{
	

		$('.register-now, .loginmain').hide();
		$('.reginput').slideDown();
	})
})