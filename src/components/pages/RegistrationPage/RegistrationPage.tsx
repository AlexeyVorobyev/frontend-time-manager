import React from "react"
import {FormProvider, useForm} from "react-hook-form"
import {Button, Divider, Grid, Paper, Stack, Typography} from "@mui/material"
import {AlexInputControlled, EInputType} from "../../formUtils/AlexInput/AlexInputControlled.tsx"
import {validEmail, validPassword} from "../../formUtils/Regex/regex.ts"
import {theme} from "../../Theme/theme.ts"
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper.tsx"
import {useSignUpMutation} from "../../../redux/api/auth.api.ts"
import {TSignUpPayload} from "../../../redux/api/types/auth.ts"
import {useNavigate} from "react-router-dom"

type TFormData = {passwordCheck:string} & TSignUpPayload

export const RegistrationPage: React.FC<any> = () => {

	const methods = useForm<TFormData>()
	const {watch} = methods
	const passwordWatch = watch('password')
	const {handleSubmit, formState: {errors}} = methods
	const [signUpMutation] = useSignUpMutation()
	const navigate = useNavigate()

	const onSubmit = (data: TFormData) => {
		console.log(data)
		signUpMutation({
			email:data.email,
			password:data.password
		}).then(() => {
			navigate('/')
		})
	}

	return (
		<Grid container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
			<Grid item width={'400px'}>
				<Paper
					elevation={3}
					sx={{
						padding: 3,
					}}
				>
					<FormProvider {...methods} >
						<Stack direction={'column'} justifyContent={'center'} spacing={theme.spacing(2)}>
							<Stack direction={'column'} justifyContent={'center'} spacing={theme.spacing(2)}>
								<AlexInputControlled name={'email'} required label={'Почта'}
													 inputType={EInputType.email}
													 error={Boolean(errors.email)}
													 errorText={errors.email?.message as string | undefined}
													 validateFunctions={{
											   regex: (valueToCheck: string) => (validEmail.test(valueToCheck)) || 'Некорректный формат почты'
										   }}
								/>

								<AlexInputControlled name={'password'} required label={'Пароль'} hidden
													 inputType={EInputType.password}
													 error={Boolean(errors.password)}
													 errorText={errors.password?.message as string | undefined}
													 validateFunctions={{
											   regex: (valueToCheck: string) => (validPassword.test(valueToCheck)) || '8 символов, заглавная и строчная буква'
										   }}
								/>

								<AlexInputControlled name={'passwordCheck'} required
													 label={'Повторите пароль'} hidden
													 inputType={EInputType.password}
													 validateFunctions={{
											   passwordCheck: (valueToCheck: string) => (valueToCheck === passwordWatch) || 'Пароли не совпадают',
											   regex: (valueToCheck: string) => (validPassword.test(valueToCheck)) || 'Пароль должен содержать 8 символов, заглавную и строчную букву'
										   }}
													 error={Boolean(errors.passwordCheck)}
													 errorText={errors.passwordCheck?.message as string | undefined}/>

								<Button size={'large'} variant="contained"
										onClick={handleSubmit(onSubmit)}>ЗАРЕГЕСТРИРОВАТЬСЯ</Button>
							</Stack>
							<Divider orientation={"horizontal"} variant={'middle'}>
								<Typography variant={'subtitle1'} textAlign={'center'}>ИЛИ</Typography>
							</Divider>
							<Stack justifyContent={'center'}>
								<Typography variant={'subtitle1'} textAlign={'center'}>
									Есть аккаунт? <LinkRouterWrapper to={'/'} sx={{
									textDecoration: 'none',
									color: theme.palette.primary.main
								}}>Авторизуйтесь</LinkRouterWrapper></Typography>
							</Stack>
						</Stack>
					</FormProvider>
				</Paper>
			</Grid>
		</Grid>
	)
}
