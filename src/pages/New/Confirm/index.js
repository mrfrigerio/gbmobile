import React from 'react'
import { TouchableOpacity } from 'react-native'
import { parseISO, formatRelative } from 'date-fns'
import pt_BR from 'date-fns/locale/pt-BR'

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '~/services/api'
import BackGround from '~/components/Background'
import { Container, Avatar, Name, Time, SubmitButton } from './styles'

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider')
  const time = navigation.getParam('time')
  const dateFormatted = formatRelative(parseISO(time), new Date(), {
    locale: pt_BR
  })

  async function handleAddAppointment() {
    await api.post('/appointments', {
      provider_id: provider.id,
      date: time
    })
    navigation.navigate('Dashboard')
  }

  return (
    <BackGround>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton onPress={handleAddAppointment}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </BackGround>
  )
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmação',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={25} color="#fff" />
    </TouchableOpacity>
  )
})
