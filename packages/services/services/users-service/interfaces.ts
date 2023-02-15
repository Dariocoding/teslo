export interface SendRequestPasswordRecoverDto {
	email: string;
}

export interface RecoverPasswordDto {
	password: string;
	passwordConfirm: string;
	email: string;
	token: string;
	iduser: string;
}
