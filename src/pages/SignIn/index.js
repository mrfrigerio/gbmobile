import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native'
import Background from '~/components/Background'
import logo from '~/assets/logo.png'
import { signInRequest } from '~/store/modules/auth/actions'
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText
} from './styles'

export default function SignIn({ navigation }) {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const passwordRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    dispatch(signInRequest(email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            secureTextEntry
            icon="lock-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
