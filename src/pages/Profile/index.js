import React, { useRef, useState, useEffect } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Background from '~/components/Background'
import {
  Container,
  Title,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  SignOutButton
} from './styles'
import { updateProfileRequest } from '~/store/modules/user/actions'
import { signOut } from '~/store/modules/auth/actions'

export default function Profile() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const profile = useSelector(state => state.user.profile)
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const emailRef = useRef()
  const oldPasswordRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  useEffect(() => {
    setOldPassword('')
    setPassword('')
    setConfirmPassword('')
  }, [profile])

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword
      })
    )
    Keyboard.dismiss()
  }

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <Container>
          <Title>Meu perfil</Title>
          <Form>
            <FormInput
              icon="person-outline"
              value={name}
              onChangeText={setName}
              placeholder="Nome completo"
              autoCorrect={false}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <FormInput
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordRef.current.focus()}
            />

            <Separator />

            <FormInput
              secureTextEntry
              icon="lock-outline"
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Sua senha atual"
              ref={oldPasswordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <FormInput
              secureTextEntry
              icon="lock-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="Sua nova senha"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <FormInput
              secureTextEntry
              icon="lock-outline"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmação de senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />
            <SubmitButton loading={loading} onPress={handleSubmit}>
              Atualizar perfil
            </SubmitButton>
            <SignOutButton loading={loading} onPress={handleSignOut}>
              Sair do GoBarber
            </SignOutButton>
          </Form>
        </Container>
      </Background>
    </TouchableWithoutFeedback>
  )
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  )
}
