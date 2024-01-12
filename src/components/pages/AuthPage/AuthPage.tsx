import React from "react"
import {FormProvider, useForm} from "react-hook-form"
import {Button, Divider, Grid, Paper, Stack, Typography} from "@mui/material"
import {AlexInput, EInputType} from "../../formUtils/AlexInput/AlexInput"
import {theme} from "../../Theme/theme.ts"
import {LinkRouterWrapper} from "../../LinkRouterWrapper/LinkRouterWrapper.tsx"
import {useSignInMutation} from "../../../redux/api/auth.api.ts"
import {TSignInPayload} from "../../../redux/api/types/auth.ts"
import {setTokenAndExpiry} from "../../functions/authTokenAndExpiry.ts"

export const AuthPage: React.FC<any> = () => {

	const methods = useForm<TSignInPayload>()
	const {handleSubmit, formState: {errors}} = methods
	const [signInMutation] = useSignInMutation()

	const onSubmit = (data: TSignInPayload) => {
		console.log(data)
		signInMutation(data)
			.then((response) => {
				setTokenAndExpiry((response as any).data)
				location.reload()
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
						<Stack spacing={theme.spacing(2)}>
							<Stack direction={'column'} justifyContent={'center'} spacing={theme.spacing(2)}>
								<AlexInput name={'email'} required label={'Почта'}
										   inputType={EInputType.email}
										   error={Boolean(errors.email)}
										   errorText={errors.email?.message as string | undefined}/>

								<AlexInput name={'password'} required label={'Пароль'} hidden
										   inputType={EInputType.password}
										   error={Boolean(errors.password)}
										   errorText={errors.password?.message as string | undefined}/>

								<Button size={'large'} variant="contained"
										onClick={handleSubmit(onSubmit)}>ВОЙТИ</Button>
							</Stack>
							<Divider orientation={"horizontal"} variant={'middle'}>
								<Typography variant={'subtitle1'} textAlign={'center'}>ИЛИ</Typography>
							</Divider>
							<Stack justifyContent={'center'}>
								<Typography variant={'subtitle1'} textAlign={'center'}>
									Нет аккаунта? <LinkRouterWrapper to={'../registration'} sx={{
									textDecoration: 'none',
									color: theme.palette.primary.main
								}}>Зарегестрируйтесь</LinkRouterWrapper></Typography>
							</Stack>
						</Stack>
					</FormProvider>
				</Paper>
			</Grid>
		</Grid>
	)
}
