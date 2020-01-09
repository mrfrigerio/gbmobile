import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native'
import { signUpRequest } from '~/store/modules/auth/actions'
import Background from '~/components/Background'
import logo from '~/assets/logo.png'
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText
} from './styles'

// import { Container } from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
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
            alue={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            secureTextEntry
            icon="lock-outline"
            alue={password}
            onChangeText={setPassword}
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta gratuita
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
