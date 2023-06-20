$(()=>{
	$('.login-submit').on('click', ()=>{
		let email=$('.email-login').val();
		let password=$('.password-login').val();
		$(".feed").text(`Your email is ${email} and your password is ${password} `);

	
	})


	$('.register-driver').on('click', ()=>{
	

		$('.register-driver, .loginmain').hide();
		$('.reg-driver').slideDown();
	});

	$('.register-company').on('click', ()=>{
	

		$('.register-company, .loginmain').hide();
		$('.reg-company').slideDown();
	})
})